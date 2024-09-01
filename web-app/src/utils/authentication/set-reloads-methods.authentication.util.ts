import {
  reloadAPublication,
  reloadCommentOfAPublication,
  reloadMainPost
} from "../../stores/reload-publication.store";

const setReloadsMethodsAuthenticationUtil = () => {
  reloadMainPost.setReloadMainPost(Date.now());
  reloadCommentOfAPublication.setReloadCommentOfAPublication(Date.now());
  reloadAPublication.setReloadAPublication(Date.now());
};

export default setReloadsMethodsAuthenticationUtil;
