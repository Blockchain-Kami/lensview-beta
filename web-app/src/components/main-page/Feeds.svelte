<script lang="ts">
  import {onMount} from "svelte";

  let imageurl;

  onMount(async () => {
    let STRING_CHAR;
    await fetch('/api/get-img', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async(res) => {
      const json = await res.json()
      console.log("RESPONSE", json);
      const img = new Uint8Array(json["data"]["data"]);

      STRING_CHAR = img.reduce((data, byte) => {
        return data + String.fromCharCode(byte);
      }, '');

      let base64String = btoa(STRING_CHAR);

      imageurl = `data:image/jpg;base64,` + base64String;
    })
  })

</script>


<!----------------------------- HTML ----------------------------->
<div class="CenterColumnFlex main__search-area__results">
  <div class="main__search-area__results__result">
    <a href="/posts/7eb7685fc0e93b18ac1cc4d0b9f27c22226354be">https://buildspace.so</a>
  </div>
  <div class="main__search-area__results__result">
    <a href="/posts/862a4fb3d7b604df38a6dd5125d341b2fa14b20b">https://www.lens.xyz/</a>
  </div>
  <div class="main__search-area__results__result">
    <a href="/posts/a022d31368593358174caf9a5b08f15d29bb4181">https://lenster.xyz</a>
  </div>
  <img src={imageurl} alt="">
</div>
<!---------------------------------------------------------------->


<!----------------------------- STYLE ----------------------------->
<style lang="scss">
  .main__search-area__results {
    gap: 0.75rem;
    height: 77vh;
    justify-content: flex-start;
    width: 100%;
  }

  .main__search-area__results__result {
    background: lightsteelblue;
    padding: 0.8rem 1rem;
    border-radius: 10px;
    margin-right: 0.75rem;
    width: 85%;
    text-align: center;
  }
</style>
<!----------------------------------------------------------------->
