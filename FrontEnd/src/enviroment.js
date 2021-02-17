const ServiceResponseEntity = class ServiceResponseEntity {
  constructor(response) {        
      this.success = Boolean(response && response.data);
      this.data = response.data;
      this.response = response;
  }
};
export { ServiceResponseEntity };