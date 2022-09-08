<!--
 * @Author: Tom
 * @LastEditors: Tom
 * @Date: 2022-09-08 10:49:29
 * @LastEditTime: 2022-09-08 11:05:24
 * @Email: Tom
 * @FilePath: \problem\docs\md\js\voice.md
 * @Environment: Win 10
 * @Description:
-->

## 语音播报

- ```html
  <button class="btn">点击</button>
  <input x-webkit-speech />

  <div class="voiceinator">
    <h1>听说 5000</h1>

    <select name="voice" id="voices">
      <option value="">Select A Voice</option>
    </select>

    <label for="rate">Rate:</label>
    <input name="rate" type="range" min="0" max="3" value="1" step="0.1" />

    <label for="pitch">Pitch:</label>
    <input name="pitch" type="range" min="0" max="2" step="0.1" />

    <textarea name="text">你好 给你点?</textarea>

    <button id="stop">Stop!</button>
    <button id="speak">Speak</button>
  </div>
  <script>
    window.onload = function () {
      let btn = document.querySelector('.btn')
      btn.onclick = function () {
        const synth = window.speechSynthesis
        const msg = new SpeechSynthesisUtterance()
        console.log(synth.speechSynthesis)
        console.log(msg.speechSynthesis)
      }

      const synth = window.speechSynthesis
      console.log(synth.getVoices())
      const msg = new SpeechSynthesisUtterance()
      let voices = []
      const voicesDropdown = document.querySelector('[name="voice"]')
      const options = document.querySelectorAll('[type="range"], [name="text"]')
      const speakButton = document.querySelector('#speak')
      const stopButton = document.querySelector('#stop')

      msg.text = '你好 给你点?'
      msg.lang = 'zh-CN'

      synth.addEventListener('voiceschanged', getSupportVoices)
      speakButton.addEventListener('click', throttle(handleSpeak, 1000))
      stopButton.addEventListener('click', handleStop)
      options.forEach(e => e.addEventListener('change', handleChange))

      function getSupportVoices() {
        voices = synth.getVoices()
        voices.forEach(e => {
          const option = document.createElement('option')
          option.value = e.lang
          option.text = e.name
          voicesDropdown.appendChild(option)
        })
        console.log(synth.getVoices())
      }
      function handleSpeak(e) {
        msg.lang = voicesDropdown.selectedOptions[0].value
        synth.speak(msg)
      }
      function handleStop(e) {
        synth.cancel(msg)
      }
      function handleChange(e) {
        msg[this.name] = this.value
      }
      function throttle(fn, delay) {
        let last = 0
        return function () {
          const now = new Date()
          if (now - last > delay) {
            fn.apply(this, arguments)
            last = now
          }
        }
      }
    }
  </script>
  ```
