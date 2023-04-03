export const buildUrl = (path) => {
	return import.meta.env.DEV
		? `http://localhost:3001/api/${path}`
		: `/api/${path}`;
};
