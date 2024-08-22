export class TransformData{
  public static removeRedundantData(data: any[]){
    if(typeof data === 'object'){
      delete (data as any)?.createdAt;
      delete (data as any)?.updatedAt;
      delete (data as any)?._id;
    }
    if(Array.isArray(data)){
      data.map((item: any) => {
        delete (item as any)?.createdAt;
        delete (item as any)?.updatedAt;
        delete (item as any)?._id;
      })
    }
    return data;
  }
}