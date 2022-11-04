import { ref, defineComponent, onMounted } from 'vue'
import axios from 'axios'
import classes from '@/styles/index.module.scss'

// import img from '@/assets/logo.png' // 返回图片资源路径
// ?url 显式加载资源为一个 URL
// ?raw' 以字符串形式加载资源
// console.log('静态图片--', img)

const imgUrl = new URL('../assets/logo.png', import.meta.url).href
// console.log('使用 new URL --', imgUrl)

export default defineComponent({
  setup() {
    // 测试mock数据
    const data = ref({})
    onMounted(() => {
      axios
        .get('/basic-api/userInfo')
        .then((res) => {
          console.log('测试mock数据', res)
          data.value = res.data
        })
        .catch((err) => {
          console.log('请求失败数据', err)
        })
    })

    return () => {
      return (
        <div>
          <br />
          <div>
            <pre>{JSON.stringify(data.value)}</pre>
          </div>
          <br />
          <div class={`root  ${classes.redTextClass}`}>hello from tsx demo page</div>
          <br />
          <p>静态图片资源</p>
          <img src={imgUrl} alt="" />
        </div>
      )
    }
  }
})
