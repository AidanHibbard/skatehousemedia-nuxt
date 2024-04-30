import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        page: '#252525',
        card: '#31363F',
      },
    },
  },
};
