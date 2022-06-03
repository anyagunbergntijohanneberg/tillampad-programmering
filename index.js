const express = require('express');
const { google } = require('googleapis');

const app = express();
const port = 3000;

const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';
const GOOGLE_PRIVATE_KEY="<-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC1YRkaRnVfWBIX\ncnpyAglI5os6zvroOzGRWJ1WlKvnPxgRJzUxMQo1ZMvWekWjXT+dydklEjtj1md9\nh/QDKjCrsoslZY/lGsyu+EUOviZN6DesWfe6+JkBocrFQPKdyKgqjiUowbsgAkTQ\nhR5aEYJLdjmblM+NCIpJtPWBj3AKVduThzvf88Al2TKidRvSUZkn5X7SH8/w+Cbm\nkoFMPl+HsKnz2YVyt6Qj48qcsr2U3njWjArcelNehihXK39rxeNjgecM4ot/iZfc\njViakpIaUG9II+N4dQZCSvpCwYiyEVmUa6dRH9q0nGNGZ6VE4oybGMcxLG6CzRD5\n2OIf9mclAgMBAAECggEABcTfXAcWr6Ao/ybsfxjSe8edcRLpRx6u3m0foAPdjd7j\nYJRLLFPfe8BHfXxpH5+VKOslJXk1e2Dz7Lm4yKr8XlGw/FEFKSfXj88kvynMJRk4\nQBqidwd2MmeXf/unW95ofuYDh47V6Vg5IRrC0uGQr97ESU8L5PP7FgoT7vmFekaf\n9gp+xVSu5eOQupj9MLblklf9wQJkwEHhutUnZT85P4G7KI66ahHnS9GKQdwa6UoG\nurkv+wfpI8PZzWbHcnggzPjGJ2qH/59r795ZWJPrpXKJ0X9/dQZdIRONLTn7ZNHh\noGQ+3G44ijlfwbFfe2YDx1lQXmNUViON8GHolVie9wKBgQD61fBlQYsojAMTRd8z\n/+DuFy03CB14oI9/yFhAAw3vl+JEn2h/2GILVTxBlijNKnCl79kLa4KOuzCyaG6R\nEQcVadwIhxo9pMJOZMHVrFvSvo0V+RSJxBm96d5p2ImZqKn/TP25NAz3VeAs/F8m\nc1upfs6bEaBqd9049DHtSru8TwKBgQC5HRSPCoyrq/Sgao8tTuYKZhDgcYFrMOQz\n1Vp3ByneEfNHwiA3LpcCpKxQylEbC1HCWjagW8vXlzzzmVAT18IGo+qgyV4Ff/go\nlI8fldGGBZac6XTMSNt6hWmGL/yKK/D4HoyKXoWorE0R/YGBHliBD/9KzR3D4LQG\nc9UjOWsESwKBgDkMGQ1eV8DT/wsOFBJmeoiLutvOO62ojppYPUHpr+yy1WIYAxM4\naiv7qaWc+hCXO2Fx6CIBxIKjrhKVT7gscDj9h25lE6G7a/maTr9C4OtQLRQ3PuWK\nNPSNUOkvtzO8OVV39Ch/3wcNf9ubViSPjeRBk8mOu7YbJrQCTayTF5lfAoGAGcBm\n5MNF8HfabxqD0nzAWb/7Jw4DQAMsK93JWPehJmh+3IOv8Z1EmrSH2DFc+RMpC417\nPfGnONWsQAMa9be1ITFaaYW507AKuLJ5+p3f6PIMEsYTXnvgNHosxOMWEa6tNgch\n6/ncRCu8CP2oL2smSsYL8L76Hg67XI5unxjUv2MCgYEA932LYHpAtaXlX5VJ0LYM\nrF5x5RfZ4tYTBEnT8JV1FySAksn0xF/8nIIeO49MMl7If8T4syDJQEPj+yQSwcV6\nAi0ubLX6XKD0KJntLMVjWDAF7uLQx3kAJZxn1df/y5A5OSjdAr9xfV3vagMkxD2p\npTxQRswszrHySYPEEDmEO7o=\n-----END PRIVATE KEY-----\n>"
const GOOGLE_CLIENT_EMAIL = "<mcanya@mc-anya.iam.gserviceaccount.com>"
const GOOGLE_PROJECT_NUMBER = "<96000407167>"
const GOOGLE_CALENDAR_ID = "<anya.gunberg@elev.ga.ntig.se>"

app.get('/', (req, res) => {
  const jwtClient = new google.auth.JWT(
    GOOGLE_CLIENT_EMAIL,
    null,
    GOOGLE_PRIVATE_KEY,
    SCOPES
  );

  const calendar = google.calendar({
    version: 'v3',
    project: GOOGLE_PROJECT_NUMBER,
    auth: jwtClient
  });

  calendar.events.list({
    calendarId: GOOGLE_CALENDAR_ID,
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  }, (error, result) => {
    if (error) {
      res.send(JSON.stringify({ error: error }));
    } else {
      if (result.data.items.length) {
        res.send(JSON.stringify({ events: result.data.items }));
      } else {
        res.send(JSON.stringify({ message: 'No upcoming events found.' }));
      }
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));