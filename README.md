# MangoMovies

Aplicación móvil para explorar películas populares, buscar por nombre y consultar sus detalles. Desarrollada como desafío técnico con React Native CLI y TypeScript, compatible con Android e iOS.

## Funcionalidades

- Listado de películas populares con póster, título y valoración.
- Búsqueda por nombre con debounce de 400 ms.
- Detalle con imagen ampliada, sinopsis, géneros y fecha de estreno.
- Estados de carga, error con reintento y lista vacía.
- Navegación tipada entre listado y detalle.

## Tecnologías

- React Native CLI 0.88.0 y React 19.3.0.
- TypeScript.
- React Navigation con Native Stack.
- Redux Toolkit y RTK Query.
- react-native-config.
- Jest y ESLint.

## Requisitos

Entorno utilizado durante el desarrollo:

| Herramienta | Versión |
| --- | --- |
| Node.js | 22.23.1 |
| npm | 10.9.8 |
| Java JDK | 17 |
| Xcode | 26.1.1 |
| Ruby | 3.3.11 |
| Bundler | 4.0.9 |

Para Android se necesitan Android Studio, Android SDK Platform 37 y Build Tools 37.0.0. El proyecto configura NDK 27.1.12297006.

Para iOS se necesita macOS, Xcode y un simulador instalado. CocoaPods y las demás gemas se instalan mediante Bundler.

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/Sofia-Sanabria/Movies-App-React-Native-CLI.git
cd Movies-App-React-Native-CLI
```

Si el repositorio es privado, se requiere acceso autorizado.

### 2. Instalar dependencias

```bash
npm ci
```

### 3. Configurar TMDB

Creá una cuenta en [TMDB](https://www.themoviedb.org/) y solicitá acceso a su API desde la configuración de tu cuenta.

Copiá el archivo de ejemplo:

```bash
cp .env.example .env
```

Completá `.env` con tu **API Read Access Token**:

```dotenv
TMDB_BASE_URL=https://api.themoviedb.org/3
TMDB_READ_ACCESS_TOKEN=tu_token_de_lectura
```

El token se coloca sin el prefijo `Bearer`.

`.env` está excluido del repositorio. Las variables se incorporan a la aplicación compilada; no constituyen almacenamiento cifrado de secretos.

Después de modificar `.env`, recompilá la aplicación.

### 4. Preparar Android

Configurá el SDK de Android mediante `ANDROID_HOME` o creá `android/local.properties` con la ruta correspondiente a tu equipo:

```properties
sdk.dir=/ruta/absoluta/al/Android/sdk
```

En macOS, la ubicación habitual es:

```properties
sdk.dir=/Users/TU_USUARIO/Library/Android/sdk
```

Este archivo es local y no debe versionarse.

Iniciá un emulador desde Android Studio o conectá un dispositivo con depuración USB habilitada.

### 5. Preparar iOS

Desde la raíz del proyecto, con Ruby y Bundler disponibles:

```bash
bundle config set --local path vendor/bundle
bundle install
cd ios
bundle exec pod install
cd ..
```

Si abrís el proyecto en Xcode, utilizá:

```text
ios/MangoMovies.xcworkspace
```

## Ejecución

Iniciá Metro desde la raíz:

```bash
npm start
```

En otra terminal, ubicada en la misma carpeta y con Node configurado, ejecutá:

### Android

```bash
npm run android
```

### iOS

```bash
npm run ios
```

La primera compilación puede tardar mientras descarga y prepara las dependencias nativas.

## Estructura

```text
src/
├── assets/       # Recursos gráficos
├── components/   # Tarjetas y créditos reutilizables
├── config/       # Configuración de entorno
├── hooks/        # Debounce reutilizable
├── navigation/   # Navegador y parámetros tipados
├── screens/      # Listado y detalle
├── services/     # Endpoints de TMDB
├── store/        # Configuración de Redux
└── types/        # Tipos de las respuestas
```

## Decisiones técnicas

**Redux Toolkit + RTK Query:** centralizan las consultas, la caché y los estados de las peticiones, evitando duplicar esa lógica en las pantallas. El texto del buscador permanece como estado local porque pertenece a esa interfaz.

**React Navigation Native Stack:** proporciona navegación nativa con parámetros tipados. Entre pantallas se envía únicamente el ID; el detalle obtiene sus datos desde TMDB.

**FlatList:** permite renderizar el listado de forma virtualizada y utiliza identificadores estables como claves.

**Imágenes:** el listado utiliza pósteres de tamaño `w342` y el detalle imágenes `w780`. Se muestra un reemplazo cuando la API no proporciona una ruta de imagen.

**Búsqueda:** espera 400 ms desde el último cambio y utiliza los datos correspondientes al término actual para evitar mostrar resultados de otra búsqueda.

## Verificaciones

```bash
npx tsc --noEmit
npm run lint
npm test -- --runInBand
```

Las pruebas automatizadas cubren:

- Montaje inicial de la aplicación.
- Espera y reinicio del debounce.
- Mensaje de lista vacía.
- Estado de error y acción de reintento.

También se verificaron manualmente el listado, la búsqueda, la navegación al detalle y el manejo de errores y recuperación de conexión en Android e iOS.

Las pruebas unitarias no sustituyen la validación de las compilaciones nativas.

## Alcance actual

- Se consultan películas, no series.
- El listado y la búsqueda muestran la primera página de resultados.
- Se necesita conexión a internet para obtener datos nuevos.
- No se incluye persistencia de la caché entre reinicios ni un modo offline dedicado.

## Créditos

Los datos e imágenes provienen de [TMDB](https://www.themoviedb.org/).

This product uses the TMDB API but is not endorsed or certified by TMDB.

## Autora

Sofia Sanabria  
[GitHub](https://github.com/Sofia-Sanabria)