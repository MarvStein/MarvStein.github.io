---
permalink: /projects/
layout: single
title: "Projects"
author_profile: true
---

### A Benchmark for Centralized Reinforcement Learning in Multi-Robot, Multi-Goal Environments

*Semester project: Computational Robotics Lab, ETHZ (2026)*

The goal of this project was to benchmark centralized joint policies for multi-robot coordination under sparse rewards.

I introduced an open-source benchmark of three multi-robot, multi-goal environments, *Reach*, *Push* and *Type*, with two robot types (velocity-controlled masspoints and UR10s), implemented in [mjlab](https://github.com/mujocolab/mjlab), and trained PPO baselines with a simple curriculum across one to four robots.


<div style="display: flex; gap: 10px; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 200px;">
    <video autoplay muted loop playsinline width="100%">
      <source src="/assets/videos/semester_project/rl_reach_demo.mp4" type="video/mp4">
      Sorry, your browser doesn't support embedded videos.
    </video>
    <p style="text-align: center; margin-top: 4px;"><em>Reach</em></p>
  </div>
  <div style="flex: 1; min-width: 200px;">
    <video autoplay muted loop playsinline width="100%">
      <source src="/assets/videos/semester_project/rl_push_demo.mp4" type="video/mp4">
      Sorry, your browser doesn't support embedded videos.
    </video>
    <p style="text-align: center; margin-top: 4px;"><em>Push</em></p>
  </div>
  <div style="flex: 1; min-width: 200px;">
    <video autoplay muted loop playsinline width="100%">
      <source src="/assets/videos/semester_project/rl_type_demo.mp4" type="video/mp4">
      Sorry, your browser doesn't support embedded videos.
    </video>
    <p style="text-align: center; margin-top: 4px;"><em>Type</em></p>
  </div>
</div>

[Full Report (PDF)](/assets/semester_project_report.pdf) · [Code](https://github.com/MarvStein/multi-robot-rl)

### World Model-based Object Pushing with SO-101

*Course project: Robot Learning (2026)*

The goal of this project was to push objects with a [SO101](https://huggingface.co/docs/lerobot/so101) robot using only RGB camera observations and a learned **world model**.

We fine-tuned [Mimic Video](https://mimic-video.github.io), a Video-Action Model pretrained on [NVIDIA Cosmos-Predict 2](https://research.nvidia.com/labs/cosmos-lab/cosmos-predict2/), on demonstrations of the SO101 pushing objects.

For deployment on cheap hardware, we built a pipeline that runs remote inference on [NVIDIA Brev](https://developer.nvidia.com/brev), then interpolates and replays the inferred action chunks on the SO101.

<div style="display: flex; gap: 10px; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 200px;">
    <video autoplay muted loop playsinline width="100%">
      <source src="/assets/videos/so101_world_model/real/eval1.mp4" type="video/mp4">
      Sorry, your browser doesn't support embedded videos.
    </video>
  </div>
  <div style="flex: 1; min-width: 200px;">
    <video autoplay muted loop playsinline width="100%">
      <source src="/assets/videos/so101_world_model/real/eval2.mp4" type="video/mp4">
      Sorry, your browser doesn't support embedded videos.
    </video>
  </div>
</div>
*Real world demonstrations of the SO-101 pushing a polyhedron in a straight-line.*

<div style="display: flex; gap: 10px; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 200px;">
    <video autoplay muted loop playsinline width="100%">
      <source src="/assets/videos/so101_world_model/video_model_output/generated_eval1_1.mp4" type="video/mp4">
      Sorry, your browser doesn't support embedded videos.
    </video>
  </div>
  <div style="flex: 1; min-width: 200px;">
    <video autoplay muted loop playsinline width="100%">
      <source src="/assets/videos/so101_world_model/video_model_output/generated_eval2_polyhedron_1.mp4" type="video/mp4">
      Sorry, your browser doesn't support embedded videos.
    </video>
  </div>
</div>
*Predicted future camera frames from the world model.*

### Legged Locomotion on Mini-Pi Robot

*Course assignments: Computational Models of Motion (2026)*

For the Computational Models of Motion lecture, I solved three assignments on legged locomotion control. This included implementing forward and inverse kinematics, trajectory optimization across models of increasing fidelity (LIP, VHIP, single rigid body, centroidal dynamics) to generate walking and backflip motions, and deep reinforcement learning to imitate a reference walking motion ([DeepMimic](https://arxiv.org/abs/1804.02717)).

<div style="display: flex; gap: 10px; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 200px;">
    <video autoplay muted loop playsinline width="100%">
      <source src="/assets/videos/minipi/minipi_walk.mp4" type="video/mp4">
      Sorry, your browser doesn't support embedded videos.
    </video>
  </div>
  <div style="flex: 1; min-width: 200px;">
    <video autoplay muted loop playsinline width="100%">
      <source src="/assets/videos/minipi/minipi_backflip.mp4" type="video/mp4">
      Sorry, your browser doesn't support embedded videos.
    </video>
  </div>
</div>
*Walking and backflip motions generated via trajectory optimization, tracked with a PD controller in MuJoCo.*

### Guiding a Simualated Fish School with Model Predictive Control

*Course project: Advanced Topics in Control (2025)*

The goal of this project was to influence the behaviour of an entire swarm by only controlling a small subset of agents directly.

The swarm was modeled as a school of fish, where each fish followed simple rules based on local interactions with its neighbors
as described in \[[Couzin et al., 2002](https://doi.org/10.1006/jtbi.2002.3065)\]. 

We developed a *Model Predictive Controller (MPC)* that uses the *Cross-Entropy Method (CEM)* to solve a nonlinear, non-convex optimal control problem online and we investigated the influence of the number of controlled agents on the performance of the controller.

Below is a small interactive demo of the underlying interaction model. **Your mouse is used to control the red fish directly.** All other fish may only be influenced indirectly through interactions with the red fish.

<canvas id="fish-simulation" width="760" height="400" style="background-color: #f0f8ff; border: 1px solid #ccc; border-radius: 4px; width: 100%; max-width: 760px; height: auto; display: block;"></canvas>
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