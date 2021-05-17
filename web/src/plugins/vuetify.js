import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        HummingBird: "#D6F0EA",
        Genoa: "#358379",
        PattensBlue: "#E9F4F6",
        WhiteIce: "#F1F9F5",
        ChelseaCucumber: "#B5B35D",
        DarkRed: "#C21414",
        FountainBlue: "#59A9A9",
        White: "#FFFFFF",
        // Aquamarine: ""
      },
    },
  },
});
