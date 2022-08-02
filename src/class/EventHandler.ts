class EventHandlerCustom {
    
    private static instance: EventHandlerCustom;

    private constructor() { 
        this.registerSearchInputEvent();
    }

    public static getInstance(): EventHandlerCustom {

        if (!EventHandlerCustom.instance) {
            EventHandlerCustom.instance = new EventHandlerCustom();
        }

        return EventHandlerCustom.instance;
    }

    private registerSearchInputEvent() {
        const filterInput = <HTMLInputElement>document.querySelector('.filter-repos');

        filterInput.addEventListener('input', (e) =>  {
            const search = (e.target as HTMLInputElement).value;
            const repos = <NodeListOf<HTMLLIElement>>document.querySelectorAll('.repo');
            const searchLowerText = search.toLowerCase();

            for (const repo of repos) {
                const lowerText = repo.innerText.toLowerCase();
                if (lowerText.includes(searchLowerText)) {
                    repo.classList.remove('hide');
                } else {
                    repo.classList.add('hide');
                }
            }
        });
    }

}