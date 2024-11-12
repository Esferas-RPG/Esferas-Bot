export interface INewCharacterProps {
    playerId?: string
    registerId?: string
    newCharacterName?: string
}

export interface IDeleteCharacterProps {
    logsLink?: string
}

export interface IValidateCharacterProps extends IDeleteCharacterProps {}
