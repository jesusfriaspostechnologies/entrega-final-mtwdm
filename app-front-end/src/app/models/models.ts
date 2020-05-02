export interface ProductModel {
    id?: string;
    categoria?: string;
    codigo?: string;
    nombre?: string;
    foto?: string;
    descripcion?: string;
    proveedor?: string;
    provDescr?: string;
    precio?: number;
};

export interface productos {
    productos?:ProductModel[];
};

export interface Api_R {
    estatu?: number;
    descripcion?:string;
    message?:string;
    result?:productos;
    error?:string;
};