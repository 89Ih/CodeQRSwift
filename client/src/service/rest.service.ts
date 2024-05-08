class RestService {
  URL: string | undefined;
  api: any;

  constructor() {
    this.URL = process.env.NEXT_PUBLIC_API_URL
  }
  async getAllOffices() {
    const res = await fetch(`${this.URL}/api`);
    const data = await res.json();
    return { data: data };
  }
  async getAllDevices() {
    const res = await fetch(`${this.URL}/api/devices/all`);
    const data = await res.json();
    return data;
  }
  async getAssigndDevices(id: string) {
    const res = await fetch(`${this.URL}/api/location/${id}`);
    const data = await res.json();
    return data;
  }
  async unassignDeviceById(id: string) {
    try {
      const res = await fetch(`${this.URL}/api/device/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ officeNr: "" }),
      });

      if (!res.ok) {
        throw new Error("Failed to update device");
      }

      const updatedDeviceInfo = await res.json();
      return updatedDeviceInfo;
    } catch (error) {
      console.error("Error updating device:", error);
      throw error;
    }
  }
  async assignDevice(id: Number, officeNr: string) {
    try {
      const res = await fetch(`${this.URL}/api/device/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ officeNr: officeNr }),
      });
      if (!res.ok) {
        throw new Error("Failed to update device");
      }
      const updatedDeviceInfo = await res.json();
      return updatedDeviceInfo;
    } catch (error) {
      console.error("Error updating device:", error);
      throw error;
    }
  }
  async declareOffice(resBody: any) {
    try {
      const res = await fetch(`${this.URL}/api/offices`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resBody),
      });
      if (!res.ok) {
        throw new Error("Failed to declare office");
      }
      return await res.json();
     
    } catch (err) {
      console.error(err);
    }
  }
  async declareDevice(resBody: any) {
    try {
      const res = await fetch(`${this.URL}/api/devices`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resBody),
      });
      if (!res.ok) {
        throw new Error("Failed to declare device");
      }
      return await res.json();
     
    } catch (err) {
      console.error(err);
    }
  }
}

const restService = new RestService();
export default restService;
