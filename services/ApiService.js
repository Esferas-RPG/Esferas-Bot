var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import 'reflect-metadata';
import { injectable } from 'tsyringe';
import { request } from 'undici';
import ErrorHandler from './Errors/ErrorHandle.js';
let ApiService = class ApiService {
    url;
    constructor() {
        this.url = 'https://esferasapi.azurewebsites.net';
    }
    async newCharacterResponse(data) {
        try {
            const response = await request(`${this.url}/character/newcharacter`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const responseData = await response.body.json();
            console.log(responseData);
            return responseData;
        }
        catch (error) {
            return ErrorHandler(error);
        }
    }
    async deleteCharacterResponse(data) {
        try {
            const response = await request(`${this.url}/character/deletecharacter`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const responseData = await response.body.json();
            console.log(responseData);
            return responseData;
        }
        catch (error) {
            return ErrorHandler(error);
        }
    }
    async moveCharacterResponse(data) {
        try {
            const response = await request(`${this.url}/character/movefile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const responseData = await response.body.json();
            console.log(responseData);
            return responseData;
        }
        catch (error) {
            return ErrorHandler(error);
        }
    }
    async validateCharacterResponse(data) {
        try {
            const response = await request(`${this.url}/character/validatecharacter`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const responseData = await response.body.json();
            console.log(responseData);
            return responseData;
        }
        catch (error) {
            return ErrorHandler(error);
        }
    }
};
ApiService = __decorate([
    injectable(),
    __metadata("design:paramtypes", [])
], ApiService);
export { ApiService };
