//https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: "server",
  database:{
    default:{
      connector :"postgresql",
    }
  }
});
