<template>
  <div class="detail">
    <h1>Vista de detalle</h1>
    <div class="card">
      <el-col :span="10">
        <el-card>
          <h2>{{detail.school}}</h2>
          <div class="content">
            <img v-if="detail.logos!= null" class="logo" :src="detail.logos[0]" />
          </div>
          <h3>{{detail.alt_name1}}</h3>
          <h3>{{detail.alt_name2}}</h3>
          <h3>{{detail.alt_name3}}</h3>
          <p>
            <strong>Mascota:</strong>
            {{detail.mascot}}
          </p>
          <p v-show="detail.conference!= null">
            <strong>Conferecia:</strong>
            {{detail.conference}}
          </p>
          <p v-show="detail.division!= null">
            <strong>División:</strong>
            {{detail.division}}
          </p>
          <p>
            <strong>Id:</strong>
            {{detail.id}}
          </p>
          <div class="color">
            <p>Color del equipo :</p>
            <div
              :style=" 'width: 75px; height: 33px; border-radius: 4px; margin-left: 10px; background: ' + detail.color"
            ></div>
          </div>
          <el-button type="primary" icon="el-icon-refresh-left" @click="goBack">volver</el-button>
        </el-card>
      </el-col>
    </div>
  </div>
</template>

<script>
export default {
  name: "Favoritos",
  data() {
    return {
      detail: {}
    };
  },
  created() {
    this.detail = this.$route.params.id;
  },
  methods: {
    goBack() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.card {
  display: flex;
  justify-content: center;
}
.item {
  list-style: none;
}
.content {
  display: flex;
  justify-content: center;
}
.logo {
  height: 100px;
  width: 100px;
  overflow: hidden;
  object-fit: cover;
}
.color {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>