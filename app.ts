import { app } from './express-app';
import { app as config } from './package.json';
import { loadData } from './test/sample.test';

loadData();

app.listen(config.port);
