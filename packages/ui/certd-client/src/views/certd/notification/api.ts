import { request } from "/src/api/service";

export function createApi() {
  const apiPrefix = "/pi/notification";
  return {
    async GetList(query: any) {
      return await request({
        url: apiPrefix + "/page",
        method: "post",
        data: query
      });
    },

    async AddObj(obj: any) {
      return await request({
        url: apiPrefix + "/add",
        method: "post",
        data: obj
      });
    },

    async UpdateObj(obj: any) {
      return await request({
        url: apiPrefix + "/update",
        method: "post",
        data: obj
      });
    },

    async DelObj(id: number) {
      return await request({
        url: apiPrefix + "/delete",
        method: "post",
        params: { id }
      });
    },

    async GetObj(id: number) {
      return await request({
        url: apiPrefix + "/info",
        method: "post",
        params: { id }
      });
    },

    async GetSimpleInfo(id: number) {
      return await request({
        url: apiPrefix + "/simpleInfo",
        method: "post",
        params: { id }
      });
    },

    async GetProviderDefine(type: string) {
      return await request({
        url: apiPrefix + "/define",
        method: "post",
        params: { type }
      });
    },

    async GetProviderDefineByType(type: string) {
      return await request({
        url: apiPrefix + "/defineByType",
        method: "post",
        params: { type }
      });
    }
  };
}