import { PropertyBase } from "./IPropertyBase";

export class Property implements PropertyBase {
    Id!: number;
    SellRent!: number;
    Name!: string;
    Type!: string;
    BHK!: number;
    FurnishingType!: string;
    Price!: number;
    BuiltArea!: string;
    CarpetArea?: number;
    Address!: string;
    Address2?: string;
    City!: string;
    FloorNo?: string;
    TotalFloor?: string;
    RTM!: number;
    RTMW?: string;
    AOP?: string;
    MainEntrance?: string;
    Security?: number;
    Gated?: number;
    Maintenance?: number;
    Possession?: string;
    Image?: string;
    Description?: string;
    PostedOn!: string;
    PostedBy!: number;
}