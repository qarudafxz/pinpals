export const useSetUserId = (response) => {
	return window.localStorage.setItem("userID", response.data.userID);
};
