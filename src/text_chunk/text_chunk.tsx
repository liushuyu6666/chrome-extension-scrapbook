// TODO: MOVE TO THE CREDENTIALS
const NESTED_CHUNK_TAGS: string[] = ["h1", "h2", "h3", "h4", "p", "pre", "li"];

const ROOT_CHUNK_SELECTOR = `div[data-message-author-role="assistant"] > :nth-child(1) > :nth-child(1)`;
const getSpecificRootChunkSelector = (dataMessageId: string) =>
	`div[data-message-author-role="assistant"][data-message-id="${dataMessageId}"] > :nth-child(1) > :nth-child(1)`;

const NESTED_HOVER_LISTENER_ATTRIBUTE = "anchor-nested-hover-listener";
// const NESTED_SELECTOR_ATTRIBUTE = 'anchor-nested-selector';

const MAX_ATTEMPT = 5;

function addNestedHoverEffect(node: HTMLElement, selector: string): void {
	if (node.hasAttribute(NESTED_HOVER_LISTENER_ATTRIBUTE)) {
		return;
	}

	node.addEventListener("mouseover", function () {
		node.classList.add("text-chunk-hover");
	});

	node.addEventListener("mouseout", function () {
		node.classList.remove("text-chunk-hover");
	});

	node.setAttribute(NESTED_HOVER_LISTENER_ATTRIBUTE, "true");
	// node.setAttribute(NESTED_SELECTOR_ATTRIBUTE, selector);
}

function addListenerDFS(currNode: HTMLElement, currSelector: string): void {
	const currTag = currNode.tagName.toLowerCase();

	if (NESTED_CHUNK_TAGS.includes(currTag)) {
		addNestedHoverEffect(currNode, currSelector);
	}

	const children = currNode.children;
	for (let i = 0; i < children.length; i++) {
		currNode = children[i] as HTMLElement;
		if (currNode.nodeType === Node.ELEMENT_NODE) {
			currSelector += ` > :nth-child(${i + 1})`;
			addListenerDFS(currNode, currSelector);
		}
	}
}

function initializeHoverEffects(times: number, maxAttempt: number): void {
	if (times > maxAttempt) return;

	const rootChunks: NodeListOf<HTMLElement> =
		document.querySelectorAll(ROOT_CHUNK_SELECTOR);

	if (rootChunks.length > 0) {
		rootChunks.forEach((rootElement: HTMLElement) => {
			const dataMessageId =
				rootElement.getAttribute("data-message-id") || "";
			const specificRootSelector =
				getSpecificRootChunkSelector(dataMessageId);
			addListenerDFS(rootElement, specificRootSelector);
		});
	} else {
		setTimeout(() => {
			initializeHoverEffects(times + 1, maxAttempt);
		}, 500);
	}
}

// Set up a MutationObserver to watch for new messages
const observer = new MutationObserver((mutations: MutationRecord[]) => {
	mutations.forEach((mutation: MutationRecord) => {
		mutation.addedNodes.forEach((node: Node) => {
			if (
				node.nodeType === Node.ELEMENT_NODE &&
				(node as HTMLElement).matches &&
				(node as HTMLElement).matches(ROOT_CHUNK_SELECTOR)
			) {
				// Check if the node is a root chunk
				const dataMessageId =
					(node as HTMLElement).getAttribute("data-message-id") || "";
				const specificRootSelector =
					getSpecificRootChunkSelector(dataMessageId);
				addListenerDFS(node as HTMLElement, specificRootSelector);
			}
		});
	});
});

observer.observe(document.body, { childList: true, subtree: true });

// Run the initialization function on page load
initializeHoverEffects(0, MAX_ATTEMPT);
