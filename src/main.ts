import * as signalR from '@microsoft/signalr';

const main = async () => {
  const connection = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Debug)
    .withUrl(`https://localhost:6001/hubs/log`, {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets
    })
    .withAutomaticReconnect()
    .build();

  connection.on('logs', (data) => {
    console.log(data);
  });

  connection
    .start()
    .then(() => console.log('Log Service Connected'))
    .catch((e) => console.log(e));
  // .then(() =>
  // connection.invoke('log', {
  //   // time: new Date().toISOString(),
  //   // action: '123',
  //   // completedSuccessfully: true,
  //   // deviceId: 'sflkjsdfkldf',
  //   // returnValue: '200'
  // })
  // )

  connection.onclose(console.log);
};

main().catch((err) => console.error(err));
