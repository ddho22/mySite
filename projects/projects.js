import { fetchJSON, renderProjects } from '../global.js';
const projects = await fetchJSON('../lib/projects.json');
const projectsContainer = document.querySelector('.projects');
renderProjects(projects, projectsContainer, 'h2');

import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';
let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);

let searchInput = document.querySelector('.searchBar');
let selectedIndex = -1;
let query = '';

function renderPieChart(projectsGiven) {
  // re-calculate rolled data
  let newRolledData = d3.rollups(
    projectsGiven,
    (v) => v.length,
    (d) => d.year,
  );
  // re-calculate data
  let newData = newRolledData.map(([year, count]) => {
    return { value: count, label: year }; // TODO
  });
  // re-calculate slice generator, arc data, arc, etc.
  let newSliceGenerator = d3.pie().value((d) => d.value)
  let newArcData = newSliceGenerator(newData);
  let newArcs = newArcData.map((d) => arcGenerator(d));
  // TODO: clear up paths and legends
  let newSVG = d3.select('svg');
  newSVG.selectAll('path').remove();
  let newLegend = d3.select('.legend');
  newLegend.selectAll('li').remove();
  // update paths and legends, refer to steps 1.4 and 2.2

  let colors = d3.scaleOrdinal(d3.schemeTableau10);
  let svg = d3.select('svg');

  newArcs.forEach((arc, i) => {
    svg
      .append('path')
      .attr('d', arc)
      .attr('fill', colors(i))
      .on('click', () => {
          selectedIndex = selectedIndex === i ? -1 : i;
        
          svg
            .selectAll('path')
            .attr('class', (_, idx) => (
              idx === selectedIndex ? 'selected' : null
              ));

              legend
              .selectAll('li')
              .attr('class', (_, idx) => (
                idx === selectedIndex ? 'selected' : null
              ));
            
              if (selectedIndex === -1) {
                renderProjects(projectsGiven, projectsContainer, 'h2');
              } else {
                let filteredProjects = projectsGiven.filter((project) => {
                  return project.year === newData[selectedIndex].label
                });
                renderProjects(filteredProjects, projectsContainer, 'h2')
              }
      });
  });

  let legend = d3.select('.legend');
  newData.forEach((d, idx) => {
    legend
      .append('li')
      .attr('style', `--color:${colors(idx)}`)
      .html(`<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`);
  });
  

};

// Call this function on page load
renderPieChart(projects);

searchInput.addEventListener('change', (event) => {
  query = event.target.value;
  let filteredProjects = projects.filter((project) => {
    let values = Object.values(project).join('\n').toLowerCase();
    return values.includes(query.toLowerCase());
  });
  // re-render legends and pie chart when event triggers
  renderProjects(filteredProjects, projectsContainer, 'h2');
  renderPieChart(filteredProjects);
  console.log(1);
});