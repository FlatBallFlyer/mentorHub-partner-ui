import { defineStore } from "pinia";
import axios from "axios";
import versionInfo from "@/version.json";

export interface Partner {
  _id:	string,
  name:	string,
  description:	string,
  status:	[ "Active", "Inactive", "Archived" ],
  url:	string,
  contactDetails:	{
    firstName:	string,
    lastName:	string,
    phone:	string,
    eMail:	string,
  }[],
  lastSaved:	{
    fromIp: string,
    byUser: string,
    atTime: string,
    correlationId: string,
  }
}

interface PartnerState {
  config: any,
  partner: Partner,
  before: Partner,
}

export const usePartnersStore = defineStore("partners", {
  state: () => ({
    config: {},
    partner: {},
    before: {},
  } as PartnerState),
  actions: {
    SET_PARTNER(payload: any) {
      this.partner = payload;
      this.before = payload;
      document.title = `Mentor Hub | ${this.partner.name}`;
    },
    RESET_PARTNER_VALUE(fieldName: keyof Partner) {
      if (
        Object.hasOwn(this.partner, fieldName)
        && Object.hasOwn(this.before, fieldName)
        // @ts-expect-error
      ) this.partner[fieldName] = this.before[fieldName];
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
    async getPartners() {
			const apiUrl = `/api/partner/`;

			try {
				// create parameter to prevent cache on flat API calls
				const params = { params: { _: new Date().getTime() } };
				const apiResponse = await axios.get(apiUrl, params);
				return apiResponse.data;
			} catch (error) {
				console.log("Error:", error);
				console.error("An error occurred:", error);
			}
    },
    async getPartner(id: string) {
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
    },
    async selectPerson(person: any, partner?: any) {
      const apiUrl = `/api/partner/${partner?._id || this.partner?._id}/contact/${person._id}`;
          
      try {
        await axios.post(apiUrl);
        this.getPartner(this.partner._id);
      } catch (error) {
        throw new Error(`Duplicate Name. ${error}`);
      }
    },
    async getPeople() {
      const apiUrl = `/api/people/`;
      const partnerContacts = this.partner?.contactDetails?.map((contact: any) => contact._id);
    
      try {
        // create parameter to prevent cache on flat API calls
        const params = { params: { _: new Date().getTime() } };
        const apiResponse = await axios.get(apiUrl, params);
        return apiResponse.data?.filter((person: any) => !partnerContacts.includes(person._id));
      } catch (error) {
        console.log("Error:", error);
        console.error("An error occurred:", error);
      }
    },
    async removePerson(person: any, partner?: any) {
      const apiUrl = `/api/partner/${partner?._id || this.partner?._id}/contact/${person._id}`;

      try {
        await axios.delete(apiUrl);
        this.getPartner(partner?._id || this.partner?._id);
      } catch (error) {
        throw new Error(`${error}`);
      }
    }
  }
});
