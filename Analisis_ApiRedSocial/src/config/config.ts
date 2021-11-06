export default {
    jwtSecret: process.env.JWT_SECRET || 'clave_cecreta_analisis2_red_social',
    DB:{
        URI: process.env.MONGODB_URL || 'mongodb://localhost/red_social',
        USER: process.env.MONGODB_USER || '',
        PASSWORD: process.env.MONGODB_PASSWORD || '',
    }
}



/*
export default {
    jwtSecret: process.env.JWT_SECRET || 'clave_cecreta_analisis2_red_social',
    DB:{
        URI: process.env.MONGODB_URL || 'mongodb://localhost/mean_social',
        USER: process.env.MONGODB_USER || '',
        PASSWORD: process.env.MONGODB_PASSWORD || '',
    }
}
*/