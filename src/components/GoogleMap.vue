<template>
  <div>
    <p class="miniwindow">{{ nowMarker.message }}</p>
    <div>
      <h2>Search and add a pin</h2>
      <GmapAutocomplete @place_changed="setPlace" />
      <button @click="addMarker">Add</button>
    </div>
    <br />
    <GmapMap
      :center="center"
      :zoom="6"
      style="width: 100%; height: 750px"
      :options="{ styles: styles }"
    >
      <GmapMarker
        v-for="(m, index) in markers"
        :key="`first-${index}`"
        :position="m.position"
        :title="m.title"
        :clickable="true"
        :draggable="false"
        @click="toggleInfoWindow(m)"/>

      <GmapInfoWindow
        v-for="(m, index) in markers"
        :key="`second-${index}`"
        :position="m.position"
        :opened="m.infoWinOpen"
        @closeclick="m.infoWinOpen = false">
<!-- <p>firebase</p> -->
<main>
      <section id="mv" class="mv__less">
        <div class="copy__wrapper">
          <h2 class="mv__ttl">メニュー登録</h2>
          <h3>Save On firebase</h3>
          <label>メニュー名：<input v-model="menuName" type="text"></label>
          <label>メニュー画像アップロード：<input ref="imgUp" type="file" id="fileImg" @change="imgUpload"></label>
          <!-- <button @click="imgUpload">アップロード</button> -->
          <label>メニュー説明：<textarea v-model="menuTxt" cols="30" rows="10"></textarea></label>
          <button @click="addMenu" class="btn_confirm">データ登録</button>
          <h2 class="mv__ttl">登録済メニューリスト</h2>
          <ul class="registered__menus">
            <li v-for="(menu, index) in menus" :key="index">
              <h3 v-if="menu.menuName" class="mv__ttl mv__ttl__menu">{{ menu.menuName }}</h3>
              <p v-if="menu.menuImgUrl"><img :src="menu.menuImgUrl" alt=""></p>
              <p v-if="menu.menuTxt">{{ menu.menuTxt }}</p>
              <button @click="removeMenu(menu.menuId, menu.menuImgFile)">データ削除</button>
            </li>
          </ul>
        </div><!--copy__wrapper-->
      </section><!--mv-->
    </main>


        <!-- <p>メッセージ</p> -->
        <!-- <div class="infowindow">
            <p>{{ m.message }}</p>
            <div id="btn">
                <select class="emoji">
                    <option value="">❤️REACTIONS</option>
                    <option value="A">❤️</option>
                    <option value="B">👍🏽</option>
                    <option value="C">👎🏽</option>
                    <option value="D">⭐️</option>
                </select><br>
                
                <button v-on:click="note">✏️COMMENT</button><br>
                <textarea name="comment" id="" cols="30" rows="10"></textarea>
            </div>
        </div> -->
        <!-- <p>{{ msg }}</p> -->
      </GmapInfoWindow>
    </GmapMap>
  </div>
</template>

<script>
import {db, storage} from '@/firebase/firebase';
//
import {collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, where, deleteDoc, getDocs, doc} from 'firebase/firestore';
import {getDownloadURL, ref, uploadBytesResumable, deleteObject} from 'firebase/storage';
//<!-- <p>firebase</p> -->
export default {
  name: "GoogleMap",
  
  data() {
    return {
      //<!-- <p>firebase</p> -->
      menuId: 0,//メニューID
      menuName: '',//メニュー名
      menuTxt: '',//メニュー説明文
      menuImgUrl: '',//メニュー画像URL
      menuImgFile: '',//メニュー画像ファイル名
      file: '',//メニュー画像ファイル
      menus: [],//描画用データ
      //<!-- <p>firebase</p> -->

      center: { lat: 34.659534285068204, lng: 138.9266236723882 },
      currentPlace: null,
      markers: [
        {
          id: 1,
          position: { lat: 34.659534285068204, lng: 138.9266236723882 },
          infoWinOpen: false,
          message: "一つ目",
        },
        {
          id: 2,
          position: { lat: 40.676102747443544, lng: 140.76764207077298 },
          infoWinOpen: false,
          message: "ふたつめ",
        },
      ],
      nextId: 3,
      nowMarker: {},
      places: [],
      styles: [
        {
          featureType: "water",
          stylers: [
            {
              color: "#19a0d8",
            },
          ],
        },
        {
          featureType: "administrative",
          elementType: "labels.text.stroke",
          stylers: [
            {
              color: "#ffffff",
            },
            {
              weight: 6,
            },
          ],
        },
        {
          featureType: "administrative",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#e85113",
            },
          ],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#efe9e4",
            },
            {
              lightness: -40,
            },
          ],
        },
        {
          featureType: "road.arterial",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#efe9e4",
            },
            {
              lightness: -20,
            },
          ],
        },
        {
          featureType: "road",
          elementType: "labels.text.stroke",
          stylers: [
            {
              lightness: 100,
            },
          ],
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [
            {
              lightness: -100,
            },
          ],
        },
        {
          featureType: "road.highway",
          elementType: "labels.icon",
        },
        {
          featureType: "landscape",
          elementType: "labels",
          stylers: [
            {
              visibility: "off",
            },
          ],
        },
        {
          featureType: "landscape",
          stylers: [
            {
              lightness: 20,
            },
            {
              color: "#efe9e4",
            },
          ],
        },
        {
          featureType: "landscape.man_made",
          stylers: [
            {
              visibility: "off",
            },
          ],
        },
        {
          featureType: "water",
          elementType: "labels.text.stroke",
          stylers: [
            {
              lightness: 100,
            },
          ],
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [
            {
              lightness: -100,
            },
          ],
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [
            {
              hue: "#11ff00",
            },
          ],
        },
        {
          featureType: "poi",
          elementType: "labels.text.stroke",
          stylers: [
            {
              lightness: 100,
            },
          ],
        },
        {
          featureType: "poi",
          elementType: "labels.icon",
          stylers: [
            {
              hue: "#4cff00",
            },
            {
              saturation: 58,
            },
          ],
        },
        {
          featureType: "poi",
          elementType: "geometry",
          stylers: [
            {
              visibility: "on",
            },
            {
              color: "#f0e4d3",
            },
          ],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#efe9e4",
            },
            {
              lightness: -25,
            },
          ],
        },
        {
          featureType: "road.arterial",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#efe9e4",
            },
            {
              lightness: -10,
            },
          ],
        },
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [
            {
              visibility: "simplified",
            },
          ],
        },
      ],
    };
  },
  // mounted() {
  //   this.geolocate();
  // },
//<!-- <p>firebase</p> -->
mounted(){
    //firestore内のデータの変化を受け取り、描画用データmenusに反映
    const q = query(collection(db, 'menus'), orderBy('menuId'))
    onSnapshot(q, snapshot => {
      //dBのすべてのmenuIdを取得
      const allId = snapshot.docs.map(doc => {
        return doc.data().menuId;
      })
      //現在最大値のID番号を代入
      if(allId.length > 0) {
        this.menuId = allId.reduce((a,b)=>a>b?a:b);
      }
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          this.menus.push(change.doc.data());
          console.log('added', change.doc.data())
        }
        if(change.type === 'removed') {
          console.log('Removed', change.doc.data());
          const currentArry = this.menus.filter(menu => {
            return menu.menuId !== change.doc.data().menuId;
          })
          this.menus = currentArry;
        }
      })
    })
  },
//<!-- <p>firebase</p> -->

  methods: {
    //<!-- <p>firebase</p> -->
    //firestoreにデータを追加
    addMenu() {
      addDoc(collection(db, 'menus'), {
        menuId: this.menuId += 1,
        menuName: this.menuName,
        menuTxt: this.menuTxt,
        created: serverTimestamp(),
        menuImgUrl: this.menuImgUrl,
        menuImgFile: this.menuImgFile,
      })
      .then((doc) => {
        console.log(`データ追加に成功しました（${doc.id}）`);
        //追加に成功したら入力データを空にする
        this.menuName = '';
        this.menuTxt = '';
        this.file = '';
        const menuImgUrlRemain = document.getElementById('fileImg');
        menuImgUrlRemain.value = '';
      })
      .catch(error => {
        //エラー時の処理
        console.log(`データ追加に失敗しました（${error}）`);
      })
    },
    //firestoreのデータを削除
    async removeMenu(menuId, photo) {
      //削除ボタンをクリックした商品データをfirestore内から削除
      const delQuery = query(collection(db, 'menus'), where('menuId', '==', menuId))
      const delSnapshot = await getDocs(delQuery);
      delSnapshot.forEach((delSnap) => {
        // console.log(doc.menuId, " => ", doc.data());
        console.log(delSnap.menuId);
        deleteDoc(doc(db, 'menus', delSnap.menuId));
      });
      //storage内の画像データも同時に削除
      if(photo) {
        const delPhotoRef = ref(storage, `images/${photo}`);
        deleteObject(delPhotoRef).then(() => {
          console.log("Photo deleted successfully")
        }).catch((error) => {
          console.log("Error Photo deleted", error)
        });
        // console.log('インデックス',menuId);
      }

    },
    //画像データをアップロード
    imgUpload(e) {
      //ファイルの取得
      // this.file = this.$refs.imgUp.files[0];
      this.file = e.target.files[0];
      //画像ファイルへの参照を作成
      const userImageRef = ref(storage, `images/${this.file.name}`)
      //画像ファイルのアップロードメソッド
      uploadBytesResumable(userImageRef, this.file).then((snapshot) => {
        console.log('Uploaded a blob or file!', snapshot);
        getDownloadURL(snapshot.ref)
        .then((downloadURL) => {
          //firestoreにURLとファイル名を保存するため
          this.menuImgUrl = downloadURL;
          this.menuImgFile = this.file.name;
          console.log('Success!', downloadURL);
        })
        .catch((error) => {
          console.error(error)
        })
      });
    },
  

//<!-- <p>firebase</p> -->



      note() {
          this.$router.push('./note')
      },
    openOriginalWindow(d) {
      console.log("OK?");
      this.nowMarker = d;
    },
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        };
        this.markers.push({
          id: this.nextId,
          position: marker,
          infoWinOpen: false,
        });
        // this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
        this.nextId++;
      }
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    },
    toggleInfoWindow(marker) {
      this.nowMarker = marker;
      this.currentPlace = marker.position;
      marker.infoWinOpen = true;
    },
  },
};
</script>


<style>
/* 
.gm-style-iw {
    max-width: 100% !important;
    width: 100%;
} */
.miniwindow {
  width: 300px;
  height: 900px;
  background-color: #fff;
  border: 1px solid #000;
  padding: 10px;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 100;
  opacity: 60%;
}

.gm-style-iw {
  position: relative !important;
  /* max-width: 100% !important; */
  top: 250px !important;
  left: 0 !important;
}

.gm-style img {
  width: 10%;
}
.gm-style .gm-style-iw-t::after {
    display: none;
}

</style>