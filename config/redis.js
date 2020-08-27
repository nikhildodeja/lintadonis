/*
|--------------------------------------------------------------------------
| Redis Configuaration
|--------------------------------------------------------------------------
|
| Here we define the configuration for redis server. A single application
| can make use of multiple redis connections using the redis provider.
|
*/

const envs = {
    local: {
        production: {
            host: '127.0.0.1',
            port: 6379,
            password: null,
            db: 0,
            keyPrefix: ''
        },
        development: {
            host: '127.0.0.1',
            port: 6379,
            password: null,
            db: 0,
            keyPrefix: ''
        },
        staging: {
            host: '127.0.0.1',
            port: 6379,
            password: null,
            db: 0,
            keyPrefix: ''
        }
    },

    clusters: {
        production: [{
            host: '127.0.0.1',
            port: 6379,
            password: null,
            db: 0
        },
        {
            host: '127.0.0.1',
            port: 6380,
            password: null,
            db: 0
        }],
        development: [{
            host: '127.0.0.1',
            port: 6379,
            password: null,
            db: 0
        },
        {
            host: '127.0.0.1',
            port: 6380,
            password: null,
            db: 0
        }],
        staging: [{
            host: '127.0.0.1',
            port: 6379,
            password: null,
            db: 0
        },
        {
            host: '127.0.0.1',
            port: 6380,
            password: null,
            db: 0
        }]
    }
};

const Env = use('Env');

module.exports = {
    /*
    |--------------------------------------------------------------------------
    | connection
    |--------------------------------------------------------------------------
    |
    | Redis connection to be used by default.
    |
    */
    connection: Env.get('REDIS_CONNECTION', 'local'),

    /*
    |--------------------------------------------------------------------------
    | local connection config
    |--------------------------------------------------------------------------
    |
    | Configuration for a named connection.
    |
    */

    local: envs.local[process.env.NODE_ENV],

    /*
    |--------------------------------------------------------------------------
    | cluster config
    |--------------------------------------------------------------------------
    |
    | Below is the configuration for the redis cluster.
    |
    */
    cluster: {
        clusters: envs.clusters[process.env.NODE_ENV]
    }
};
