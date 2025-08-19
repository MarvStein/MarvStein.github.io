---
permalink: /projects/
layout: single
title: "Projects"
author_profile: true
---

### Model Predictive Control for a Multi-Agent System

*Course project: Advanced Topics in Control (2025)*

The goal of this project was to **influence the behaviour of an entire swarm by only controlling a small subset of agents directly**.

The swarm was modeled as a school of fish, where each fish followed simple rules based on local interactions with its neighbors
as described in \[[Couzin et al., 2002](https://doi.org/10.1006/jtbi.2002.3065)\]. 

We developed a *Model Predictive Controller (MPC)* that uses the *Cross-Entropy Method (CEM)* to solve a nonlinear, non-convex optimal control problem online and we investigated the influence of the number of controlled agents on the performance of the controller.

Below is a small interactive demo of the underlying interaction model. **Your mouse is used to control the red fish directly.** All other fish may only be influenced indirectly through interactions with the red fish.

<canvas id="fish-simulation" width="760" height="400" style="background-color: #f0f8ff; border: 1px solid #ccc; border-radius: 4px;"></canvas>
<script src="/assets/js/fish-demo.js"></script>
*Interactive demo of the fish school. Use your mouse to control the red fish and influence all others.*

### State Estimation for Bicycle Model

*Course project: Recursive Estimation (2025)*

The goal of this project was to estimate the state (position, heading, speed) and the length of a bicycle from noisy and incomplete sensor data.

{% include figure popup=true image_path="/assets/images/Bicycle_Model.png" alt="Bicycle Model" caption="Bicycle Model used for state estimation." %}

I successfully implemented and tuned an **Extended Kalman Filter (EKF)** and **Particle Filter (PF)** to handle the non-linear dynamics, noisy measurements, missing data and non-Gaussian noise distributions.
The results of the EKF are shown below, where the estimated states closely track the ground truth.

{% include figure popup=true image_path="/assets/images/Bicycle_Estimation.png" alt="State Esstimation Results" caption="EKF estimation results with ground truth and measurements." %}

### Dynamic Speed Limits for Traffic Control

*Course project: Computational Control (2025)*

In this project, I had to act as a consultant for a ficticious city having issues with traffic congestion and [grid lock](https://en.wikipedia.org/wiki/Gridlock). Different controllers for *dynamic speed limits* on highways were developed and evaluated in a given simulation environment built on [SUMO](https://eclipse.dev/sumo/).

I implement a model predictive controller with disturbance rejection and quantized move blocked inputs and two novel
data-driven controllers, which learn a non-parametric model of the system (i.e. the system's behaviour) directly from the training data - [DeePC](https://control.ee.ethz.ch/research/theory/data-enabled-predictive-control.html) and [TPC](https://www.research-collection.ethz.ch/bitstream/handle/20.500.11850/716622/TheTransientPredictor.pdf?sequence=1&isAllowed=y).

All controllers were able to reduce the CO2 emissions in the evaluation scenario by over 50% compared to the legacy P-Controller.