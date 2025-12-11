**Required Softwares:**
1. Java
2. SpringBoot
3. Maven
4. MySQL
5. Node Js


**DataBases and Tables:**
1. user_mgmt
   - Table : user
2. prescription_db
   - Table : prescriptions
3. stock_db
   - Table : orders,products



**Setup the Service for each Services:**
1. Auth Service (Port 8076)
     -cd auth-service
     -mvn clean install
2. Prescription Service (Port 8081)
     -cd prescription-service
     -mvn clean install
3. Stock Service (Port 8082)
     -cd stock-service
     -mvn clean install
4.API Gateway (Port 8080)
     -cd api-gateway
     -mvn clean install
5. React Frontend (Port 3000)
     -cd pharmacy-frontend
     -npm install

**Running the Application:**
**Start Services in Order**
Terminal 1: Auth Service
     -cd auth-service
     -mvn spring-boot:run
Terminal 2: Prescription Service
     -cd prescription-service
     -mvn spring-boot:run
Terminal 3: Stock Service
     -cd stock-service
     -mvn spring-boot:run
Terminal 4: API Gateway
     -cd api-gateway
     -mvn spring-boot:run
Terminal 5: React Frontend
     -cd pharmacy-frontend
     -npm start

The Following API's used in the application are:
1. http://localhost:8076/health → Auth Service
2. http://localhost:8081/api/v1/prescription/health → Prescription Service
3. http://localhost:8082/api/v1/products/health → Stock Service
4. http://localhost:8080/health → API Gateway
5. http://localhost:3000 → Frontend
