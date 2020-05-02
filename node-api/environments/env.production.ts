export default {
    API: {
        NAME: 'Micro-Servicio Punto de Venta | NodeJS',
        PORT: 3000,
        ENVIRONMENT: 'Development'
    },
    NOTIFY: {
        DELAY: 1000 * 10        // 10 Segundos
    },
    TOKEN: {
        SECRET_KEY: 'god-of-web',
        EXPIRES: 5000    // 5 segundos, también se puede manejar en segundos '120s'
    },
    MONGODB: {
        HOST: '10.211.55.9',
        PORT: 27017,
        USER_NAME: 'dba-root',
        USER_PASSWORD: 'mongodbadmin',
        DEFAULT_DATABASE: 'admin'
    }
};
