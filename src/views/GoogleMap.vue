<template>
  <div>
    <p class="miniwindow">{{ nowMarker.message }}</p>
    <div>
      <h2>Search and add a pin</h2>
      <GmapAutocomplete @place_changed="setPlace" />
      <button @click="addMarker"><img src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-location-contact-us-flaticons-flat-flat-icons.png"/>
      <br>Add</button>
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
      
        :position="{lat:m.position.latitude, lng:m.position.longitude}"
        :title="m.title"
        :clickable="true"
        :draggable="false"
        @click="toggleInfoWindow(m)">
        <!-- 元のコード -->
        <!-- :position="m.position" -->
<!-- 40.676102747443544 
140.76764207077298
        35.7056232
        139.751919-->
 

        </GmapMarker>
      <GmapInfoWindow
        v-for="(m, index) in markers"
        :key="`second-${index}`"
        :position="{lat:m.position.latitude, lng:m.position.longitude}"
        :opened="m.infoWinOpen"
        @closeclick="m.infoWinOpen = false">
        <div class="infowindow">
            <div id="btn">
                <select v-model="reaction">
                    <option value="">❤️REACTIONS</option>
                    <option value="❤️">❤️</option>
                    <option value="👍🏽">👍🏽</option>
                    <option value="👎🏽">👎🏽</option>
                    <option value="⭐️">⭐️</option>
                </select><br>
                
                <!-- <button v-on:click="note">✏️</button><br> -->
                <!-- <textarea name="comment" id="" cols="30" rows="10"></textarea> --> 
                <label>place:<input v-model="regName" type="text"></label><br> 
                <label class="photoSelected"><img src="https://img.icons8.com/wired/64/000000/add-image.png"/>
                <input ref="imgUp" type="file" id="fileImg" @change="imageDataUpdate(index)" multiple></label>
                <button @click="imgUpload" :disabled="!imgSelected">
                  <span class="material-symbols-outlined">file_upload</span>
                </button>
                <button @click="saveMarker" class="btn_confirm" :disabled="!reaction || !regName">SAVE</button>
                <p>{{ m.regName }} {{ m.reaction }}</p>
                <!-- <ul>
                  <li v-for="(miu, index) in markers[index].markerImgUrl" :key="index">
                    <p v-if="miu"><img :src="miu" alt=""></p>
                  </li>
                </ul> -->
                <button @click="removeMarker(m.id, m.markerImgFile)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M6.5 1a.5.5 0 0 0-.5.5v1h4v-1a.5.5 0 0 0-.5-.5h-3ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1H3.042l.846 10.58a1 1 0 0 0 .997.92h6.23a1 1 0 0 0 .997-.92l.846-10.58Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/></svg>
                </button>
                <!-- <button>submit</button><br> -->
            </div>
        </div>

      </GmapInfoWindow>
    </GmapMap>
    <!-- <p>firebase</p> -->
    <main>
      <section id="mv" class="mv__less">
        <div class="copy__wrapper">
          <h2 class="mv__ttl"></h2>
          <!-- <h3>Save On firebase</h3> -->
          <!-- <label>name of the place：<input v-model="place" type="text"></label> -->
          
          <h2 class="mv__ttl">LIST</h2>

          <!-- とりあえず表示 -->
          <div class="select-nav">
              <label><input type="radio" v-model="reaction" value="">❤️REACTIONS</label>
              <label><input type="radio" v-model="reaction" value="❤️">❤️</label>
              <label><input type="radio" v-model="reaction" value="👍🏽">👍🏽</label>
              <label><input type="radio" v-model="reaction" value="👎🏽">👎🏽</label>
              <label><input type="radio" v-model="reaction" value="⭐️">⭐️</label>
          </div>
        <ul class="regi_markers">
          <li v-for="(marker, index) in filteredList" :key="index">
            <!-- <p v-if="marker.id">{{ marker.id }}</p> -->
            <p v-if="marker.regName">{{ marker.regName }}</p>
            <p v-if="marker.reaction">{{ marker.reaction }}</p>
            <!-- <p v-if="pin.place">{{ pin.place }}</p> -->
            <ul>
              
              <!-- <li v-for="(posi, index) in markers[index].position" :key="index">
                <p v-if="posi">{{ posi }}</p>
              </li> -->
            </ul>
            <!-- <img style="width: 20%; height: 20%;" :src="marker.markerImgUrl"> -->
            <ul class="mius">
              <li v-for="(miu, index) in markers[index].markerImgUrl" :key="index">
                <p v-if="miu"><img :src="miu" alt=""></p>
              </li>
            </ul>
            
          <button @click="removeMarker(marker.id, marker.markerImgFile)">delete</button>
          </li>
        </ul>
        </div><!--copy__wrapper-->
      </section><!--mv-->
    </main>
  </div>
</template>

<script>
import {db, storage} from '@/firebase/firebase';
//
import {collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, where, deleteDoc, getDocs, doc, GeoPoint} from 'firebase/firestore';
// import {collection, addDoc, serverTimestamp, onSnapshot, query, orderBy} from 'firebase/firestore';
import {getDownloadURL, ref, uploadBytesResumable, deleteObject} from 'firebase/storage';
// import marker from 'vue2-google-maps/dist/components/marker';
//<!-- <p>firebase</p> -->
export default {
  name: "GoogleMap",
  
  data() {
    return {
      //<!-- <p>firebase</p> -->
      center: { lat: 34.659534285068204, lng: 138.9266236723882 },
      currentPlace: null,
      // markers: [
      //   {
      //     id: 1,
      //     position: { lat: 34.659534285068204, lng: 138.9266236723882 },
      //     infoWinOpen: false,
      //     message: "一つ目",
      //   },
      //   {
      //     id: 2,
      //     position: { lat: 40.676102747443544, lng: 140.76764207077298 },
      //     infoWinOpen: false,
      //     message: "ふたつめ",
      //   },
      // ],

      // firebaseで登録した内容
      // pins: [],
      id: 0,//id（マーカー用）
      position: [],
      markers: [],


      latitude: '',
      longitude: '',
      lat: '',
      lng: '',
      infoWinOpen: false,
      places: '',

      // nextId: 1,
      nowMarker: {},


      markerImgUrl: [],
      markerImgFile:[],
      file: [],
      imgSelected: false,
      selected:'',
      select:'',
      reaction: '',
      regName: '',
      styles: [
    {
        "featureType": "administrative.country",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#eace9e"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "hue": "#ff0000"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "labels",
        "stylers": [
            {
                "color": "#ad8f5a"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#b77510"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#876118"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "weight": "4"
            },
            {
                "hue": "#ffa900"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape.natural.landcover",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.natural.landcover",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#ff9a00"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.natural.terrain",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.government",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.medical",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.place_of_worship",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.school",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.sports_complex",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#86bcc4"
            }
        ]
    }
],
    };
  },
  // mounted() {
  //   this.geolocate();
  // },
//<!-- <p>firebase</p> -->
mounted(){
  //marker

    //firestore内のデータの変化を受け取り、描画用データmarkersに反映    MAP
    const m = query(collection(db, 'markers'), orderBy('id'))
    onSnapshot(m, snapshot => {
      //dBのすべてのmenuIdを取得
      const allId = snapshot.docs.map(doc => {
        return doc.data().id;
      })
      //現在最大値のID番号を代入
      if(allId.length > 0) {
        this.id = allId.reduce((a,b)=>a>b?a:b);
      }
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          this.markers.push(change.doc.data());
          console.log('added', change.doc.data())
        }
        if(change.type === 'removed') {
          console.log('Removed', change.doc.data());
          const currentArry = this.markers.filter(marker => {
            return marker.id !== change.doc.data().id;
          })
          this.markers = currentArry;
        }
      })
    })
  },
//<!-- <p>firebase</p> -->
  computed: {
    filteredList() {
      return this. markers.filter(
        (marker) => !marker.reaction.indexOf(this.reaction)
      );
    }
  },
  
  methods: {
    //<!-- <p>firebase</p> -->
    //firestoreにデータを追加 map
    saveMarker() {
      addDoc(collection(db, 'markers'), {
        id: this.id += 1,
        // id: this.nextId,
        // markers: new GeoPoint(Number(this.latitude), Number(this.longitude)),
        position: new GeoPoint(Number(this.nowMarker.position.latitude), Number(this.nowMarker.position.longitude)),
        // menuTxt: this.menuTxt,
        // place: this.place,
        infoWinOpen: false,
        created: serverTimestamp(),
        markerImgUrl: this.markerImgUrl,
        markerImgFile: this.markerImgFile,

        regName: this.regName,
        reaction: this.reaction,
      })
      .then((doc) => {
        console.log(`データ追加に成功しました（${doc.id}）`);
        this.markers.splice(-1,1)   // addMarker saveMarkerのidを調整
        //追加に成功したら入力データを空にする
        this.latitude = '';
        this.longitude = '';
        this.file = [];
        this.regName = '';
        this.reaction = '';
        // this.place = '';
        const markerImgUrlRemain = document.getElementById('fileImg');
        markerImgUrlRemain.value = '';
        this.$router.go({path: this.$router.currentRoute.path, force: true})
        // this.nextId++;
      })
      .catch(error => {
        //エラー時の処理
        console.log(`データ追加に失敗しました（${error}）`);
      })
    },
    //firestoreのデータを削除
    async removeMarker(id, photo) {
      //削除ボタンをクリックした商品データをfirestore内から削除
      const delQuery = query(collection(db, 'markers'), where('id', '==', id))
      const delSnapshot = await getDocs(delQuery);
      delSnapshot.forEach((delSnap) => {
        // console.log(doc.id, " => ", doc.data());
        console.log(delSnap.id);
        deleteDoc(doc(db, 'markers', delSnap.id));
      });
      //storage内の画像データも同時に削除
      if(photo) {
        for(let i = 0; i < photo.length; i++) {
          const delPhotoRef = ref(storage, `images/${photo[i]}`);
          deleteObject(delPhotoRef).then(() => {
            console.log("Photo deleted successfully")
          }).catch((error) => {
            console.log("Error Photo deleted", error)
          });
          // console.log('インデックス',id);
        }
      }
    },
    //画像データをアップロード
    imageDataUpdate(index) {
      console.log(index)
      const result = this.$refs.imgUp
      this.file = result[index].files
      //ファイル選択したらアップロードボタンを押せるようにする
      this.imgSelected = true;
    },
    imgUpload() {
      for(let i = 0; i < this.file.length; i++) {
        //ファイルの取得
        // this.file[i] = this.$refs.imgUp.files[i];
        // this.file = this.$refs.imgUp.files[0]
        // }
        // console.log(this.file)
        // this.file = e.target.files[0];
        //画像ファイルへの参照を作成
        const userImageRef = ref(storage, `images/${this.file[i].name}`)
        //画像ファイルのアップロードメソッド
        uploadBytesResumable(userImageRef, this.file[i]).then((snapshot) => {
          console.log('Uploaded a blob or file!', snapshot);
          getDownloadURL(snapshot.ref)
          .then((downloadURL) => {
            //firestoreにURLとファイル名を保存するため
            this.markerImgUrl[i] = downloadURL;
            console.log('Success!', downloadURL);
            this.markerImgFile[i] = this.file[i].name;
            console.log('Success!', this.file[i].name);
            //アップロードが終わったらアップロードボタンを押せなくする
            this.imgSelected = false;
          })
          .catch((error) => {
            console.error(error)
          })
        });
      }
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
          latitude: this.currentPlace.geometry.location.lat(),
          longitude: this.currentPlace.geometry.location.lng(),
        };
        
        this.markers.push({
          // id: this.nextId,
          id: this.id,
          position: marker,
          infoWinOpen: false,
          place: this.place,
          regName: this.regName,
          reaction: this.reaction,
        });
        // this.places.push(this.currentPlace);
        console.log(this.markers)
        this.center = marker;
        this.currentPlace = null;
        // this.nextId++;
      }
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          // lat: position.coords.latitude,
          // lng: position.coords.longitude,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    },
    toggleInfoWindow(marker) {
      this.nowMarker = marker;
      this.currentPlace = marker.position;
      marker.infoWinOpen = true;
    },//toggleInfoWindow
  }//methods
}//export default
</script>


<style>
/* 
.gm-style-iw {
    max-width: 100% !important;
    width: 100%;
} */
/* .miniwindow {
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
} */


/*infowindowの全体*/
.gm-style-iw {
  /* position: relative !important; */
  /* max-width: 100% !important; */
  width: 300px;
  top: 2px !important;
  left: 0 !important;
}

.gm-style img {
  width: 10%;
}
/*infowindowの枠*/
.gm-style .gm-style-iw-c {
  margin-top: -20px;
}
/*infowindowの先*/
.gm-style .gm-style-iw-t::after {
    /* display: none; */
    margin-top: -20px;
}

.uphotoSelected img{

}
/* ホバー時 */
.photoSelected:hover {
  box-shadow: 0 8px 10px -2px rgba(0, 0, 0, 0.2); /* 影を表示 */
}

.photoSelected input {
display:none; /* アップロードボタンのスタイルを無効にする */
}

</style>