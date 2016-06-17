class Barix {
	elems:Array<Element>;

    /**********************************************************
	 * constructor
	 *********************************************************/
	constructor (elems:Array<Element>) {
		this.elems = elems;
    }
    ///////////////////////////////////////////////////////////

	
	/**********************************************************
	 * a jquery like selector
	 *********************************************************/
	public static select (selector: string | Node) {
		let elems:Array<Element> = new Array<Element>();
		
		if (selector && typeof(selector) == "string") {
            let elemList = document.querySelectorAll(selector as string);
            elems = Barix.ListToArray(elemList);
		}
		else if (selector instanceof Element) {
			elems.push(selector);
		} else {
			var e:ExceptionInformation = 'Barix: ' + selector + ' is not a supported selector or Element.';
			throw e;
		}
		
		let b = new Barix(elems);
		return b;
	}
    ///////////////////////////////////////////////////////////

	
	/**********************************************************
	 * addClass
	 *********************************************************/	
	public addClass (classNames:string) {
		let classes = (classNames || "").trim();
		let classAddArr:string[] = classes.split(' ');
		let el:Element;
		for (let i in this.elems) {			
			el = this.elems[i];	
			for(let j in classAddArr) {
				if(el.className.indexOf(classAddArr[j]) < 0) {
					el.className += " " + classAddArr[j];
				}
			}			
			el.className = el.className.trim();
		}
		return this;
	}
	///////////////////////////////////////////////////////////
		
	
	/**********************************************************
	 * removeClass...
	 *********************************************************/
	public removeClass (classNames:string) {
		let classes = (classNames || "").trim();
		
		//if empty, then remove all classes
		if(classes == ""){
			for (let i in this.elems) {
				this.elems[i].className = '';
			}
			return this;
		}		
		
		//if Not Empty
		let classRemArr:string[] = classes.split(' ');
		let existingClasses:string[];
		let newClasses:string;
		for (let i in this.elems) {
			newClasses = '';
			existingClasses = this.elems[i].className.split(' ');			
			for(let j in existingClasses) {
				if (classRemArr.indexOf(existingClasses[j]) < 0) {
					newClasses += " " + existingClasses[j];
				}
			}			
			newClasses = newClasses.trim();
			this.elems[i].className = newClasses;
		}
		return this;
	}
	///////////////////////////////////////////////////////////
	
	
	/**********************************************************
	 * hasClass
	 *********************************************************/
	public hasClass (classNames:string): boolean {
		let classes = (classNames || "").trim();
		
		//if empty, return true
		if(classes == ""){
			return true;
		}		
		
		//if Not Empty
		let classArgArr:string[] = classes.split(' ');
		let existingClasses:string[];
		let el:Element;
		let newClasses:string;
		let hasClass:boolean = true;
		
		for (let i in this.elems) {
			el = this.elems[i];			
			for(let j in classArgArr) {
				if(el.className.indexOf(classArgArr[j]) < 0) {
					hasClass=false;
					return hasClass;
				}
			}
		}
		return hasClass;
    }
    ///////////////////////////////////////////////////////////


	/**********************************************************
	 * .each(callback)
	 *********************************************************/
	public each (callback: Function) {
		let c:Function;
		for (let i in this.elems) {
			c = callback.bind(this.elems[i]);		//so that this=element
			c(i, this.elems[i]);				//param1=index, param2=element=this
        }
        return this;
    }
    ////////////////////////////////////////////////////////////


    /***********************************************************
    * .css({styleNameValuePairObject})
    ***********************************************************/
    public css(...args) {
        let el: HTMLElement;
        let styleObj: any;
        
        if (args.length == 2) {             //if style is provided as (name,value)
            styleObj = {};
            styleObj[args[0]] = args[1];
        }
        else if (args.length == 1) {        //if style is provided as json object
            styleObj = args[0];
        }
        else {
            var e = 'Barix: css style can be provided as single (name,value) pair or as a json object.'
            throw e;
        }
        for (let i in this.elems) {
            el = this.elems[i] as HTMLElement;
            for (let key in styleObj) {
                el.style[key] = styleObj[key];
            }
        }
        return this;
    }
    /////////////////////////////////////////////////////////////



    /***********************************************************
    * .on
    ***********************************************************/
    public on(...args) {
        let eventName: string = args[0];
        let selector: string;
        let callback: EventListener;

        if (args.length == 2) {
            callback = args[1];
            for (let i in this.elems) {
                this.elems[i].addEventListener(eventName, callback);
            }
        }
        else if (args.length == 3) {
            selector = args[1];
            callback = args[2];
            let parentEl: Element;
            let selectorEl:NodeListOf<Element>;
            let selectorElArr: Element[];
            let el: Element;
            let cb: Function;

            for (let i in this.elems) {
                parentEl = this.elems[i];                          

                parentEl.addEventListener(eventName, function (ev) {
                    selectorEl = parentEl.querySelectorAll(selector);
                    selectorElArr = Barix.ListToArray(selectorEl);
                    el = ev.target as Element;
                    while (el != parentEl) {
                        if (selectorElArr.indexOf(el) > -1) {
                            cb = callback.bind(el);
                            cb(ev);
                            break;
                        }
                        else {
                            el = el.parentElement;
                        }
                    }
                })
            }
        }
        return this;
    }
    ////////////////////////////////////////////////////////////


    /***********************************************************
    * .text(textContent) -> overwrites text Content
    ***********************************************************/
    public text(textContent: string) {
        for (let i in this.elems) {
            this.elems[0].textContent = textContent;
        }
    }
    ////////////////////////////////////////////////////////////


    /***********************************************************
    * .appendText(textContent) -> appends text Content
    ***********************************************************/
    public appendText(textContent: string) {
        for (let i in this.elems) {
            this.elems[0].textContent += textContent;
        }
    }
    ////////////////////////////////////////////////////////////


    /***********************************************************
    * .html(htmlContent) -> overwrites HTML Content
    ***********************************************************/
    public html(htmlContent: string) {
        for (let i in this.elems) {
            this.elems[0].innerHTML = htmlContent;
        }
    }
    ////////////////////////////////////////////////////////////


    /***********************************************************
    * .append(htmlContent) -> Appends HTML Content
    ***********************************************************/
    public append(htmlContent: string) {
        for (let i in this.elems) {
            this.elems[0].innerHTML += htmlContent;
        }
    }
    ////////////////////////////////////////////////////////////


    /***********************************************************
    * List to Array Converter
    ***********************************************************/
    static ListToArray(list: any) {
        let arr: any = [];
        for (let i = 0; i < list.length; i++) {
            arr.push(list[i]);
        }
        return arr;
    }
    ////////////////////////////////////////////////////////////




}

var bx = Barix.select;
