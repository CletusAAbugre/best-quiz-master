Best QuizMaster Deployment
This document outlines the steps I followed to deploy Best QuizMaster, a sports-themed quiz application, on two web servers (Web01 and Web02). Additionally, I configured a load balancer (Lb01) to ensure efficient traffic distribution between the servers.

The quiz questions in Best QuizMaster are dynamically fetched from the Open Trivia Database API: https://opentdb.com/api_config.php.

Deployment Steps
Install Nginx on Web Servers

Updated system packages and installed Nginx on both servers.
Uploaded the application files to /var/www/html/.
Configure Nginx on Web Servers

Configured Nginx to serve the Best QuizMaster application.
Verify Application

Confirmed the application loads successfully:
Web01: http://107.21.88.109
Web02: http://54.237.140.194
Load Balancer Configuration
Install Nginx on Lb01

Installed Nginx on the load balancer server.
Configure Load Balancing

Configured an upstream block in the Nginx configuration to balance traffic between Web01 and Web02.
Test Load Balancer

Verified load balancing by accessing http://54.90.82.26 and refreshing the page to confirm traffic alternates between servers.
Testing Steps
Simulated a server failure by stopping Nginx on Web01 and verified that Web02 handled all requests seamlessly.
Restarted Nginx on Web01 to restore full functionality.
Notes
The application dynamically fetches quiz questions from the Open Trivia Database API: https://opentdb.com/api_config.php.
Ensure all servers have proper permissions configured for secure access.
Protect configurations to prevent unauthorized modifications.