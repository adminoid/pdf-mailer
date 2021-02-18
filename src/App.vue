<template>
<div class="mini-margin">
  <div></div>
  <div class="float-right to">
    <p>143500, г. Истра, ул. Советская, д. 7а</p>

    <contenteditable tag="p" contenteditable v-model="fields.whomPosition" :noNL="true" :noHTML="true" @returned="enterPressed" class="field"/>

    <contenteditable tag="p" contenteditable v-model="fields.whomName" :noNL="true" :noHTML="true" @returned="enterPressed" class="field"/>

  </div>
</div>
<div class="clear"></div>
<main>
  <div class="centered">

    <contenteditable tag="h3" contenteditable v-model="fields.header" :noNL="true" :noHTML="true" @returned="enterPressed" class="field"/>

    <div class="form">
      <label for="email">На какой email отправлять?</label>
      <br>
      <br>
      <input type="text" id="email" ref="email" v-model="fields.email">
    </div>

    <br>

  </div>
  <p>Ваше предприятие - одно из крупнейших в нашем регионе, и Вы, как его руководитель, входите в деловую элиту города Истра. Ваше предприятие также значится в списке социально ответственных компаний.</p>
  <p>По этой причине обращаюсь к Вам от лица Благотворительного фонда по формированию здорового образа жизни «Здоровый Выбор». Фонд является некоммерческой организацией и с 2004 года занимается реабилитацией больных наркоманией и алкоголизмом. За это время в фонд обратились за помощью около 7 тыс. человек, образовано и восстановлено около 300 семейных пар, рождено более 200 здоровых детей. Фонд отмечен различными наградами и благодарственными письмами.</p>
  <p>Один из филиалов фонда находится в г. Истра, и имеет на балансе один центр реабилитации и один центр ресоциализации, в которых проходит программу около 50 человек. Для обеспечения жизнедеятельности людей на центре требуются услуги вашего предприятия, которых недостаточно у фонда.</p>
  <p>Прошу Вас оказать благотворительную помощь в виде продукции, которую реализует Ваша компания.</p>
  <p>Со своей стороны, Фонд с радостью опубликует информацию о Вашей компании на основном сайте «Здоровый Выбор» (в разделе «Благотворители»), разместит наружную рекламу (роллапы, баннеры, информационные стенды) Вашей компании на массовых мероприятиях «Здоровый Выбор» (терапевтические лагеря, концерты и др.), а также
    рассмотрит другие предложенные Вами формы сотрудничества.</p>
</main>

</template>

<script>
import contenteditable from 'vue-contenteditable'
import axios from 'axios'

export default {
  name: 'App',

  components: {
    contenteditable
  },

  data () {
    return {
      fields: {
        whomPosition: 'Директору «Арена-Истра»',
        whomName: 'Адамову Николаю Адамовичу',
        header: 'Уважаемый Николай Адамович',
        email: 'info@romb.ru'
      }
    }
  },

  methods : {
    enterPressed () {
      axios.post('/save-data', this.fields)
          .then((response) => {
            console.log(response)
          })
    },

    focusInput() {
      this.$refs.email.focus()
    }
  },

  mounted() {
    this.focusInput()
  }
}
</script>

<style lang="sass">

.field[contenteditable],
.form
  background-color: #f6ec8c
  border: 2px dashed #f1a665
  border-radius: 5px

.form
  background-color: #bbe3ff
  padding: 5px 0
  input
    height: 30px
    font-size: 14px

.to
  width: 19em
  margin-bottom: 3em

</style>
