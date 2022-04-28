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

        <!-- <p>メッセージ</p> -->
        <div class="infowindow">
            <p>{{ m.message }}</p>
            <div id="btn">
                <select class="emoji">
                    <option value="">❤️REACTIONS</option>
                    <option value="A">❤️</option>
                    <option value="B">👍🏽</option>
                    <option value="C">👎🏽</option>
                    <option value="C">⭐️</option>
                </select><br>
                
                <button v-on:click="note">✏️COMMENT</button><br>
                <textarea name="comment" id="" cols="30" rows="10"></textarea>
            </div>
        </div>
        <!-- <p>{{ msg }}</p> -->
      </GmapInfoWindow>
    </GmapMap>
  </div>
</template>

<script>
export default {
  name: "GoogleMap",
  
  data() {
    return {
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

  methods: {
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

.gm-style .gm-style-iw-t::after {
    display: none;
}
</style>