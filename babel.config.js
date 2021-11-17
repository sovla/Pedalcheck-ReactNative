module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.ts', '.android.ts', '.ts', '.ios.tsx', '.android.tsx', '.js', '.json'],
          alias: {
            '@': './src',
            '@Component': './src/Component',
            '@Container': './src/Container',
            '@assets': './src/assets',
            '@Util': './src/Util',
          },
        },
      ],
    ],
  };
};
