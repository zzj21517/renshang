<template>
  <div id="bgColor">
    <div class="system">
      <div v-for="(item,index) in systems" :key="index">
        <router-link :to="item.path">
          <single-button :msg='item.name' :btnColor='item.bgColor'></single-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import singleButton from '@/components/component/singleButton'
  export default {
    created() {
      console.log(this.$store.getters.roles.roleId+'zzz')
      if (this.$store.getters.roles.userIndex===4) {
        this.systems = [{
          path: '/backstageInfo',
          name: '后台信息',
          bgColor: {
            backgroundColor: 'lightgreen'
          },
          isShow: true
        }]
      } else if ([1,2,3,5,6,7,8].indexOf(this.$store.getters.roles.userIndex)>=0) {
        this.systems = [{
            path: '/custom/list',
            name: '客户服务系统',
            bgColor: {
              backgroundColor: 'orchid'
            },
            isShow: true
          },
          // {
          //   path: '/law',
          //   name: '律所系统',
          //   bgColor: {
          //     backgroundColor: 'royalblue'
          //   },
          //   isShow: false
          // },
          {
            path: '/backstageInfo',
            name: '后台信息',
            bgColor: {
              backgroundColor: 'lightgreen'
            },
            isShow: true
          }
        ]
      } else {
        this.systems = [{
            path: '/custom/list',
            name: '客户服务系统',
            bgColor: {
              backgroundColor: 'orchid'
            },
            isShow: true
          }
        ]
      }
    },
    data() {
      return {
        showSystem: true,
        systems: [],
      }
    },
    components: {
      singleButton
    },
    methods: {
      open() {
        this.$router.push("/custom/list")
      },
      oaOpen() {
        this.$alert('正在开发中。。。', 'OA系统', {
          confirmButtonText: '确定',

        });
      },
      lvOpen() {
        this.$alert('正在开发中。。。', '律所系统', {
          confirmButtonText: '确定',

        });
      },
      smallProgramOpen() {
        this.$router.push('/checkCard/addCheckCard')
      },
      activateCard() {
        this.$router.push('/activateCard/addActivateCard')
      }
    },
  }
</script>

<style scoped>
  #bgColor {
    color: orchid;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: dodgerblue;
  }

  .system {
    width: 900px;
    height: 600px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -450px;
    margin-top: -300px;
  }
</style>