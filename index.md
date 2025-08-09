---
layout: default
title: "Home"
---

<link rel="stylesheet" href="/assets/css/custom.css">

<header>
  <h1>Bhagawath Venkat Kantamneni</h1>
  <p>CS/Stats/Econ @ UMich • Data & ML for markets</p>
  <p>
    <a href="mailto:bkanta@umich.edu">Email</a> ·
    <a href="https://github.com/bhagawath-cal">GitHub</a> ·
    <a href="https://www.linkedin.com/in/bhagawath-kantamneni-167815133/">LinkedIn</a> ·
    <a href="/static/resume.pdf">Resume</a>
  </p>
</header>

<section id="about">
  <h2>About</h2>
  <p>Data analyst and aspiring quant with strong Python and statistical modeling chops. I've optimized forecasts and built ML systems, and I'm comfortable across data engineering, visualization, and infra. I'm finishing a B.S. in Computer Science, Statistics, and Economics at the University of Michigan (GPA 3.5) with coursework in NLP, CV, Deep Learning, Bayesian methods, Econometrics, and Machine Learning.</p>
</section>

<section id="experience">
  <h2>Experience</h2>
  {% for job in site.data.experience %}
  <div class="job">
    <h3>{{ job.position }} — {{ job.company }}</h3>
    <p><em>{{ job.location }} · {{ job.timeframe }}</em></p>
    <ul>
    {% for p in job.points %}
      <li>{{ p }}</li>
    {% endfor %}
    </ul>
  </div>
  {% endfor %}
</section>

<section id="education">
  <h2>Education</h2>
  {% for edu in site.data.education %}
  <div class="edu">
    <h3>{{ edu.degree }} — {{ edu.school }}</h3>
    <p><em>{{ edu.timeframe }}</em>{% if edu.gpa %} · GPA {{ edu.gpa }}{% endif %}</p>
    {% if edu.details %}
    <ul>
      {% for d in edu.details %}<li>{{ d }}</li>{% endfor %}
    </ul>
    {% endif %}
  </div>
  {% endfor %}
</section>

<section id="skills">
  <h2>Skills</h2>
  <ul>
    {% for s in site.data.skills %}
      <li><strong>{{ s.category }}</strong>: {{ s.items | join: ", " }}</li>
    {% endfor %}
  </ul>
</section>

<section id="projects">
  <h2>Projects</h2>
  {% if site.data.projects and site.data.projects.size > 0 %}
    {% for pr in site.data.projects %}
      <div class="project">
        <h3>{{ pr.name }}</h3>
        <p>{{ pr.description }}</p>
        <p><em>{{ pr.stack | join: " • " }}</em></p>
        {% if pr.link %}<p><a href="{{ pr.link }}">View</a></p>{% endif %}
        {% if pr.image %}<img alt="{{ pr.name }}" src="{{ pr.image }}" />{% endif %}
      </div>
    {% endfor %}
  {% else %}
    <p>Coming soon.</p>
  {% endif %}
</section>
