import { ICategory } from "../../categories/models/category";

export interface IRecipeTable {
    pageNumber: number,
    pageSize: number,
    data: IRecipeData[],
    totalNumberOfRecords: number,
    totalNumberOfPages: number
}
export interface IRecipeData {
    id: 46,
    name: string,
    imagePath: string,
    description: string,
    price: number,
    creationDate: string,
    modificationDate: string,
    category: ICategory[],
    tag: IRecipeTag
}
export interface IRecipeTag {
    id: number,
    name: string,
    creationDate: string,
    modificationDate: string
}