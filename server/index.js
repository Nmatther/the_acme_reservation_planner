const { client, createTables,createCustomer,createReservation,createRestaurant,destroyReservation,fetchCustomers,fetchRestaurants,fetchReservations } = require('./db');

app.get('/api/customers', async (req, res, next) => {
    try {
      res.send(await fetchCustomers());
    } catch(err) {
      next(err);
    }
  });

app.get('/api/restaurants', async (req, res, next) => {
    try {
      res.send(await fetchRestaurants());
    } catch(err) {
      next(err);
    }
  }); 

app.get('/api/reservations', async (req, res, next) => {
    try {
      res.send(await fetchReservations());
    } catch(err) {
      next(err);
    }
  });

app.post('/api/reservations', async (req, res, next) => {
    const { date, party_count, restaurant_id } = req.body;
    try {
      res.send(await createReservation(date, party_count, restaurant_id));
    } catch(err) {
      next(err);
    }
  });

  app.delete('/api/reservations/:id', async (req, res, next) => {
    try {
      await destroyReservation(req.params.id);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  });

async function init () {
    try {
        await client.connect();
        await createTables();
        const[matt, andy, shannon, karen, mcdonolds, stratons, ihop, mortons] = await Promise.all({
            createCustomer('Matt'),
            createCustomer('Andy'),
            createCustomer('Shannon'),
            createCustomer('Karen'),
            createRestaurant('Mcdonolds'),
            createRestaurant('Stratons'),
            createRestaurant('Ihop'),
            createRestaurant('Mortons')
        })
        console.log(await fetchCustomers());
        console.log(await fetchRestaurants());

        const [res1, res2, res3] = await Promise.all([
            createReservation('2020-08-01', 4, stratons.id),
            createReservation('2020-08-02', 3, ihop.id),
            createReservation('2020-08-03', 2, mortons.id),
        ]);

        await destroyVacation(vacay1.id);
        console.log(await fetchVacations());
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}!`);
        });
        } catch (err) {
            console.error(err);
        }
}

init();
