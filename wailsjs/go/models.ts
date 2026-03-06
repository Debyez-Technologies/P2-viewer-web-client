export namespace main {
	
	export class AnnotationHighlight {
	    id: string;
	    text: string;
	    color: string;
	    timestamp: string;
	    dmCode: string;
	
	    static createFrom(source: any = {}) {
	        return new AnnotationHighlight(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.text = source["text"];
	        this.color = source["color"];
	        this.timestamp = source["timestamp"];
	        this.dmCode = source["dmCode"];
	    }
	}
	export class Bookmark {
	    id: number;
	    title: string;
	    dmcode: string;
	
	    static createFrom(source: any = {}) {
	        return new Bookmark(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.title = source["title"];
	        this.dmcode = source["dmcode"];
	    }
	}
	export class CsdbConnectionStatus {
	    connected: boolean;
	    message: string;
	
	    static createFrom(source: any = {}) {
	        return new CsdbConnectionStatus(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.connected = source["connected"];
	        this.message = source["message"];
	    }
	}
	export class CsdbCredentials {
	    serverAddress: string;
	    username: string;
	    password: string;
	
	    static createFrom(source: any = {}) {
	        return new CsdbCredentials(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.serverAddress = source["serverAddress"];
	        this.username = source["username"];
	        this.password = source["password"];
	    }
	}
	export class CsdbPublication {
	    id: string;
	    name: string;
	
	    static createFrom(source: any = {}) {
	        return new CsdbPublication(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	    }
	}
	export class Note {
	    dmCode: string;
	    text: string;
	    note: string;
	    id: string;
	
	    static createFrom(source: any = {}) {
	        return new Note(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.dmCode = source["dmCode"];
	        this.text = source["text"];
	        this.note = source["note"];
	        this.id = source["id"];
	    }
	}

}

