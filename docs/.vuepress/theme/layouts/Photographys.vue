// Layout of the `entry page`
<template>
  <div class="labels-container">
    <my-header></my-header>
    <particles-bg color="#ffffff" type="cobweb" :bg="false" class="bg"/> 
    <div class="label-content">
      <div class="left">
        <div class="recently-blog-mobile">
          <span class="recently-title">最近摄影</span>
          <mobile-blog-item
            v-for="(item, index) in Blogs"
            :key="index"
            :source="item.frontmatter.picture"
            :title="item.frontmatter.title"
            :content="item.frontmatter.desc"
            :time="item.frontmatter.date"
            :path="item.path"
            :category="item.frontmatter.category"
          />
        </div>

        <div class="recently-blog">
          <span class="recently-title">最近摄影</span>
          <div class="blog-container">
            <blog-item
              v-for="(item, index) in Blogs"
              :key="index"
              :source="item.frontmatter.picture"
              :title="item.frontmatter.title"
              :content="item.frontmatter.desc"
              :path="item.path"
              :time="item.frontmatter.date"
              :category="item.frontmatter.category"
            />
          </div>
        </div>
      </div>
      <div class="right">
        <label-card />
        <info-card />
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyHeader from "@theme/components/Navbar";
import MyFooter from "@theme/components/Footer";
import MobileBlogItem from "@theme/components/MobileBlogItem";
import BlogItem from "@theme/components/BlogItem";
import LabelCard from "@theme/components/LabelCard";
import InfoCard from "@theme/components/InfoCard";
import { sortBlog } from "../utils";
export default {
   data() {
    return {
      Blogs: [],
    };
  },
  components: {
    MyHeader,
    MyFooter,
    BlogItem,
    MobileBlogItem,
    LabelCard,
    InfoCard
  },
  methods: {
    getRecentBlogs() {
      let pages = this.$site.pages;
      return pages.filter((item) => {
        const { photography } = item.frontmatter;
        return photography !== undefined;
      });
    },
  },
  created() {
    this.Blogs = sortBlog(this.getRecentBlogs()).slice(0, 8);
  },
};
</script>

<style lang="less">
@import "@theme/common/color.less";
.labels-container {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  position: relative;
  .bg {
    width: 100vw;
    height: 100vh;
    position: fixed;
    background: left / cover fixed no-repeat url("../assets/background.jpg");
    z-index: -1;
  }
  .label-content {
    position: relative;
    flex: 1;
    @media (min-width: 992px) {
      margin-top: 30px;
    }
    @media (max-width: 992px) {
      width: 100%;
    }
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: row;
    max-width: 1284px;
    margin: 0 auto;
    .left {
      flex: 1;
      position: relative;
      @media (max-width: 992px) {
        border-radius: 10px;
        overflow: hidden;
        width: 100%;
      }
      .mobile-classify-label {
        @media (min-width: 992px) {
          display: none;
        }
        padding: 0 10px;
      }
      .recently-blog-mobile {
        @media (min-width: 992px) {
          display: none;
        }
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0 10px;
        .recently-title {
          display: inline-block;
          font-size: 1.8rem;
          color: @whiteColor;
          font-weight: 100;
          margin: 20px 0 0 0;
          position: relative;
          &:after {
            content: "";
            width: 80%;
            height: 1px;
            background-color: #36bfc4;
            position: absolute;
            bottom: -5px;
            left: 10%;
          }
        }
      }
      .recently-blog {
        @media (max-width: 992px) {
          display: none;
        }
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        // margin: 0 auto;
        .blog-container {
          display: flex;
          // justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          min-width: 904px;
          div {
            margin-right: 20px;
          }
        }
        .recently-title {
          display: inline-block;
          font-size: 3rem;
          color: @whiteColor;
          font-weight: 100;
          margin: 0px 0 20px 0;
          text-align: center;
          position: relative;
          &:after {
            content: "";
            width: 80%;
            height: 1px;
            background-color: #36bfc4;
            position: absolute;
            bottom: -5px;
            left: 10%;
          }
        }
      }
    }
    .right {
      @media (max-width: 992px) {
        display: none;
      }
      display: flex;
      flex-direction: column;
      margin-left: 80px;
      justify-content: space-between;
      align-items: flex-start;
    }
  }
}
</style>
