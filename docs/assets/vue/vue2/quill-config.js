/*
 * @Author: Tom
 * @LastEditors: Tom
 * @Date: 2021-10-08 18:07:29
 * @LastEditTime: 2021-10-17 16:52:53
 * @Email: str-liang@outlook.com
 * @FilePath: \joolun-wx-ui\src\utils\quill-config.js
 * @Environment: Win 10 Python 3.8
 * @Description:
 */
import api from "@/api/goodscategory";

const uploadConfig = {
  methods: "POST", // 必填参数 图片上传方式
  token: "", // 可选参数 如果需要token验证，假设你的token有存放在sessionStorage
  name: "file", // 必填参数 文件的参数名
  size: 700, // 可选参数   图片大小，单位为Kb, 1M = 1024Kb
  accept: "image/png, image/gif, image/jpeg, image/bmp, image/x-icon", // 可选 可上传的图片格式
  type: "audio/mp4,video/mp4"
};

// toolbar工具栏的工具选项（默认展示全部）
const toolOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],
  [{ size: ["small", false, "large", "huge"] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ["clean"],
  ["link", "image", "video"]
];
const handlers = {
  file: function file(value) {
    console.log(value);
  },
  //配置上传图片
  image: function image() {
    var self = this;
    var fileInput = this.container.querySelector("input.ql-image[type=file]");
    if (fileInput === null) {
      fileInput = document.createElement("input");
      fileInput.setAttribute("type", "file");
      // 设置图片参数名
      if (uploadConfig.name) {
        fileInput.setAttribute("name", uploadConfig.name);
      }
      // 可设置上传图片的格式
      fileInput.setAttribute("accept", uploadConfig.accept);
      fileInput.setAttribute("style", "width:100px;height:100px;");
      fileInput.classList.add("ql-image");
      // 监听选择文件
      fileInput.addEventListener("change", function() {
        // 创建formData
        var formData = new FormData();

        formData.append(uploadConfig.name, fileInput.files[0]);
        // 如果需要token且存在token
        if (uploadConfig.token) {
          formData.append("token", uploadConfig.token);
        }
        api.apiFileDescribe(formData).then(response => {
          let url = response.data.src;
          let length = self.quill.getSelection().index; //获取当前鼠标焦点位置
          self.quill.insertEmbed(length, "image", url);
          self.quill.setSelection(length + 1);
        });
      });
      this.container.appendChild(fileInput);
    }
    fileInput.click();
  },
  //配置上传视频
  video: function(value) {
    var self = this;
    var fileInput = this.container.querySelector("input.ql-video[type=file]");
    if (fileInput === null) {
      fileInput = document.createElement("input");
      fileInput.setAttribute("type", "file");
      if (uploadConfig.name) {
        fileInput.setAttribute("name", uploadConfig.name);
      }
      fileInput.setAttribute("accept", uploadConfig.type);
      fileInput.classList.add("ql-video");
      fileInput.addEventListener("change", function() {
        var formData = new FormData();
        formData.append(uploadConfig.name, fileInput.files[0]);
        if (uploadConfig.token) {
          formData.append("token", uploadConfig.token);
        }
        api.apiFileDescribe(formData).then(response => {
          let url = response.data.src;
          let length = self.quill.getSelection().index; //获取当前鼠标焦点位置
          self.quill.insertEmbed(length, "video", url);
        });
      });

      this.container.appendChild(fileInput);
    }
    fileInput.click();
  }
};

export default {
  placeholder: "",
  theme: "snow", // 主题
  modules: {
    toolbar: {
      container: toolOptions, // 工具栏选项
      handlers: handlers // 事件重写
    }
  }
};
