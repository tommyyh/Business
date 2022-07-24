import React from 'react';
import StoryCSS from './s.module.scss';
import AboutStory from '../../../../assets/img/about_story.png';

const Story = () => {
  return (
    <section className={StoryCSS.story_cont}>
      <div className={StoryCSS.story}>
        <div className={StoryCSS.story_main}>
          <h2>Our Story</h2>
          <p>
            ornare massa eget egestas purus viverra accumsan in nisl nisi
            scelerisque eu ultrices vitae auctor eu augue ut lectus arcu
            bibendum at varius vel pharetra vel turpis nunc eget lorem dolor
            viverra accumsan in nisl nisi scelerisque eu ultrices vitae auctor
            eu augue ut lectus arcu
          </p>
        </div>

        <div className={StoryCSS.story_section_cont}>
          <div className={StoryCSS.story_section}>
            <img src={AboutStory} alt='people' />

            <div className={StoryCSS.story_right}>
              <h3>Title 1</h3>
              <p>
                ornare massa eget egestas purus viverra accumsan in nisl nisi
                scelerisque eu ultrices vitae auctor eu augue ut lectus arcu
                bibendum at varius vel pharetra vel turpis nunc eget lorem dolor
                arcu bibendum at varius vel pharetra vel turpis nunc eget lorem
                dolor
              </p>
            </div>
          </div>

          <div className={StoryCSS.story_section}>
            <div className={StoryCSS.story_right}>
              <h3>Title 2</h3>
              <p>
                ornare massa eget egestas purus viverra accumsan in nisl nisi
                scelerisque eu ultrices vitae auctor eu augue ut lectus arcu
                bibendum at varius vel pharetra vel turpis nunc eget lorem dolor
                arcu bibendum at varius vel pharetra vel turpis nunc eget lorem
                dolor
              </p>
            </div>

            <img src={AboutStory} alt='people' />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
