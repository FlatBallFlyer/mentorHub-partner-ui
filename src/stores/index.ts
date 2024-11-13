import { defineStore } from "pinia";
import axios from "axios";
import versionInfo from "@/version.json";

export const usePartnersStore = defineStore("partners", {
  state: () => ({
    config: {} as any,
    partner: {} as any,
    before: {} as any,
  }),
  actions: {
    SET_PARTNER(payload: any) {
      this.partner = payload;
      this.before = payload;
      document.title = this.partner.userName;
    },
    RESET_PARTNER_VALUE(fieldName: any) {
      this.partner[fieldName] = this.before[fieldName];
    },
    async initializeStore() {
      const configUrl = `/api/config/`;
      const params = {
        params: {
          _: new Date().getTime()
        }
      }; // prevent cache on flat API calls

      try {
        const configResponse = await axios.get(configUrl, params);

        const patchResponse = await axios.get("/patch.txt", params);
        const patchValue = patchResponse.data.trim();
        configResponse.data.uiVersion = `${versionInfo.major}.${versionInfo.minor}.${patchValue}`;

        this.config = configResponse.data;
      } catch (error) {
        console.log("Error:", error);
        console.error("An error occurred:", error);
      }
    },
    async getPartner(id: string) {
      console.log("mode", import.meta.env.MODE)
      const apiUrlWithId = `/api/partner/${id}`;

      try {
        const response = await axios.get(apiUrlWithId);
        this.SET_PARTNER(response.data);
      } catch (error) {
        console.error("A `GET` error occurred:", error);
      }
    },
    async patchPartner({ id, fieldName, value }: any) {
      const apiUrlWithId = `/api/partner/${id}`;

      const payload = { [fieldName]: value };

      try {
        const response = await axios.patch(apiUrlWithId, payload);
        this.SET_PARTNER(response.data);
        return response.data;
      } catch (error) {
        this.RESET_PARTNER_VALUE(fieldName);
        throw new Error("Invalid Value");
      }
    },
    async postPartner() {
      const apiUrlWithId = `/api/partner/`;

      const payload = this.partner;
      
      try {
        const response = await axios.post(apiUrlWithId, payload);
        this.SET_PARTNER(response.data);
        console.log("response", response.data)
        return response.data;
      } catch (error) {
        throw new Error(`Duplicate Name. ${error}`);
      }
    }
  }
});
