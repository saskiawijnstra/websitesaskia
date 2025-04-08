<template>
  <div class="content-page">
    <article class="">
      <div class="work-list grid-container">
        <div class="introduction col-span-6">
          <h1>Discover my <strong>Work</strong></h1>
        </div>
        <br />
        <div class="content col-span-12">
          <project-teaser
            project-id="whatsuper"
            thumbnail-path="/images/projects/thumbnails/Whatsuper-frozen.jpg"
            thumbnail-alt-text="
          Two mobile phone screens display a Dutch grocery shopping app interface. 
          The left screen shows special offers for fruits like Conference pears (€1.19/kg), 
          tangerines (€2.99/2kg), blueberries, and nectarines. The right screen shows filter 
          options for store selection (including Albert Heijn, Lidl, Aldi, Dirk) and product 
          categories such as bread, dairy, vegetables, and more. The background features fresh
          pears on the left and blueberries on the right."
          >
            <template #title>
              Freelance project <strong>Whatsuper</strong>
            </template>
            <template #description>
              All supermarket offers in one overview. A light and clear design
              to make you find the best sales on daily products.
            </template>
          </project-teaser>
          <project-teaser
            project-id="longcovidsurvival"
            thumbnail-path="/images/projects/thumbnails/survivalgids-frozen.jpg"
            thumbnail-alt-text="
      Instagram post from @longcovid.survival.gids shown on a phone screen, 
      alongside a carousel post illustrating brain pathways with Dutch text 
      about forming new neural paths."
          >
            <template #title>
              @longcovid.<strong>survival</strong>.gids
            </template>
            <template #description>
              From surviving to feeling alive again. How I recovered from long
              covid with the mind body approach. Building new neural pathways
              with trust, self-compassion, courage and perseverance.
            </template>
          </project-teaser>
          <project-teaser
            project-id="hansboodt"
            thumbnail-path="/images/projects/thumbnails/hansboodt.jpg"
            thumbnail-alt-text="
        On the left side of the image, a mannequin wearing an elegant, 
        flowing pink dress is suspended in the air by rings in a dramatic, 
        softly lit scene. On the right, a smartphone displays the Hans Boodt Mannequins 
        website, showing a rotatable 3D model of a mannequin. The composition 
        highlights the blend of physical product design with digital representation."
          >
            <template #title>
              <strong>Hans Boodt Mannequins</strong> Snakeware
            </template>
            <template #description>
              In what way can Augmented Reality contribute to a more efficient
              assessment of mannequins using a digital interactive product?
            </template>
          </project-teaser>
          <project-teaser
            project-id="sprong"
            thumbnail-path="/images/projects/thumbnails/sprong.jpg"
            thumbnail-alt-text="
    Two mobile screens from a wellness app. The left screen greets 
    the user with a friendly sloth illustration and a gentle activity 
    suggestion. The right screen shows a weekly progress overview with activity, 
    feelings, and symptoms tracking."
          >
            <template #title> <strong>Sprong</strong> VuMC, Onconet </template>
            <template #description>
              How can we make people with breast cancer feel more in control
              over their exercise program and improve the communication of data
              with their physiotherapist through an engaging service?
            </template>
          </project-teaser>
        </div>
      </div>
    </article>
    <grid-test />
  </div>
</template>

<script setup lang="ts">
import gridTest from "../grid-test.vue";
import ProjectTeaser from "../elements/work/project-teaser.vue";
</script>

<style lang="scss" scoped>
.work-list {
  .content {
    display: grid;
    grid-template-columns: subgrid;

    row-gap: calc-rem(140px);
    > :nth-child(even) {
      transform: translateY(calc-rem(-73px));
    }
  }
}
</style>
