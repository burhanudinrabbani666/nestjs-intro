'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nestjs-intro documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                                <li class="link">
                                    <a href="overview.html" data-type="chapter-link">
                                        <span class="icon ion-ios-keypad"></span>Overview
                                    </a>
                                </li>

                            <li class="link">
                                <a href="index.html" data-type="chapter-link">
                                    <span class="icon ion-ios-paper"></span>
                                        README
                                </a>
                            </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>

                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-bfcbfe20149306e0ef08d60e5563aa4b44a12985cbda0450783bcb20b78738752a873477aab29804adf918be4f18a38316451e304811ed622aada235567e07b4"' : 'data-bs-target="#xs-controllers-links-module-AppModule-bfcbfe20149306e0ef08d60e5563aa4b44a12985cbda0450783bcb20b78738752a873477aab29804adf918be4f18a38316451e304811ed622aada235567e07b4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-bfcbfe20149306e0ef08d60e5563aa4b44a12985cbda0450783bcb20b78738752a873477aab29804adf918be4f18a38316451e304811ed622aada235567e07b4"' :
                                            'id="xs-controllers-links-module-AppModule-bfcbfe20149306e0ef08d60e5563aa4b44a12985cbda0450783bcb20b78738752a873477aab29804adf918be4f18a38316451e304811ed622aada235567e07b4"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-bfcbfe20149306e0ef08d60e5563aa4b44a12985cbda0450783bcb20b78738752a873477aab29804adf918be4f18a38316451e304811ed622aada235567e07b4"' : 'data-bs-target="#xs-injectables-links-module-AppModule-bfcbfe20149306e0ef08d60e5563aa4b44a12985cbda0450783bcb20b78738752a873477aab29804adf918be4f18a38316451e304811ed622aada235567e07b4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-bfcbfe20149306e0ef08d60e5563aa4b44a12985cbda0450783bcb20b78738752a873477aab29804adf918be4f18a38316451e304811ed622aada235567e07b4"' :
                                        'id="xs-injectables-links-module-AppModule-bfcbfe20149306e0ef08d60e5563aa4b44a12985cbda0450783bcb20b78738752a873477aab29804adf918be4f18a38316451e304811ed622aada235567e07b4"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-7419ef4a2bb5741b6db6d87d82dc18de2ce7a9e1b2443545495a6aec5ce9c61bcfdb29b93c23d5a977103c53a570657d66ad3a4b7a6292ebb5199fb94d7ddd57"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-7419ef4a2bb5741b6db6d87d82dc18de2ce7a9e1b2443545495a6aec5ce9c61bcfdb29b93c23d5a977103c53a570657d66ad3a4b7a6292ebb5199fb94d7ddd57"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-7419ef4a2bb5741b6db6d87d82dc18de2ce7a9e1b2443545495a6aec5ce9c61bcfdb29b93c23d5a977103c53a570657d66ad3a4b7a6292ebb5199fb94d7ddd57"' :
                                            'id="xs-controllers-links-module-AuthModule-7419ef4a2bb5741b6db6d87d82dc18de2ce7a9e1b2443545495a6aec5ce9c61bcfdb29b93c23d5a977103c53a570657d66ad3a4b7a6292ebb5199fb94d7ddd57"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-7419ef4a2bb5741b6db6d87d82dc18de2ce7a9e1b2443545495a6aec5ce9c61bcfdb29b93c23d5a977103c53a570657d66ad3a4b7a6292ebb5199fb94d7ddd57"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-7419ef4a2bb5741b6db6d87d82dc18de2ce7a9e1b2443545495a6aec5ce9c61bcfdb29b93c23d5a977103c53a570657d66ad3a4b7a6292ebb5199fb94d7ddd57"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-7419ef4a2bb5741b6db6d87d82dc18de2ce7a9e1b2443545495a6aec5ce9c61bcfdb29b93c23d5a977103c53a570657d66ad3a4b7a6292ebb5199fb94d7ddd57"' :
                                        'id="xs-injectables-links-module-AuthModule-7419ef4a2bb5741b6db6d87d82dc18de2ce7a9e1b2443545495a6aec5ce9c61bcfdb29b93c23d5a977103c53a570657d66ad3a4b7a6292ebb5199fb94d7ddd57"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostsModule.html" data-type="entity-link" >PostsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PostsModule-952fbfa84106937c7d6147768228284e03c54c88ac84d7c0692cd6e8ac2d5f369f7cd94852070ca28170520e02af28f10b1e5d3da3eb2933da783e3181ec0392"' : 'data-bs-target="#xs-controllers-links-module-PostsModule-952fbfa84106937c7d6147768228284e03c54c88ac84d7c0692cd6e8ac2d5f369f7cd94852070ca28170520e02af28f10b1e5d3da3eb2933da783e3181ec0392"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-952fbfa84106937c7d6147768228284e03c54c88ac84d7c0692cd6e8ac2d5f369f7cd94852070ca28170520e02af28f10b1e5d3da3eb2933da783e3181ec0392"' :
                                            'id="xs-controllers-links-module-PostsModule-952fbfa84106937c7d6147768228284e03c54c88ac84d7c0692cd6e8ac2d5f369f7cd94852070ca28170520e02af28f10b1e5d3da3eb2933da783e3181ec0392"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostsModule-952fbfa84106937c7d6147768228284e03c54c88ac84d7c0692cd6e8ac2d5f369f7cd94852070ca28170520e02af28f10b1e5d3da3eb2933da783e3181ec0392"' : 'data-bs-target="#xs-injectables-links-module-PostsModule-952fbfa84106937c7d6147768228284e03c54c88ac84d7c0692cd6e8ac2d5f369f7cd94852070ca28170520e02af28f10b1e5d3da3eb2933da783e3181ec0392"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-952fbfa84106937c7d6147768228284e03c54c88ac84d7c0692cd6e8ac2d5f369f7cd94852070ca28170520e02af28f10b1e5d3da3eb2933da783e3181ec0392"' :
                                        'id="xs-injectables-links-module-PostsModule-952fbfa84106937c7d6147768228284e03c54c88ac84d7c0692cd6e8ac2d5f369f7cd94852070ca28170520e02af28f10b1e5d3da3eb2933da783e3181ec0392"' }>
                                        <li class="link">
                                            <a href="injectables/PostsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-f12dd136ba6a06abab0c82a5bbc7c11a8665ab8011b28b08b9df63b86239183edf2c4e278e13957ba94d51ba724860bb734953c23c241b8dad07cbd1b56e7784"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-f12dd136ba6a06abab0c82a5bbc7c11a8665ab8011b28b08b9df63b86239183edf2c4e278e13957ba94d51ba724860bb734953c23c241b8dad07cbd1b56e7784"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-f12dd136ba6a06abab0c82a5bbc7c11a8665ab8011b28b08b9df63b86239183edf2c4e278e13957ba94d51ba724860bb734953c23c241b8dad07cbd1b56e7784"' :
                                            'id="xs-controllers-links-module-UsersModule-f12dd136ba6a06abab0c82a5bbc7c11a8665ab8011b28b08b9df63b86239183edf2c4e278e13957ba94d51ba724860bb734953c23c241b8dad07cbd1b56e7784"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-f12dd136ba6a06abab0c82a5bbc7c11a8665ab8011b28b08b9df63b86239183edf2c4e278e13957ba94d51ba724860bb734953c23c241b8dad07cbd1b56e7784"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-f12dd136ba6a06abab0c82a5bbc7c11a8665ab8011b28b08b9df63b86239183edf2c4e278e13957ba94d51ba724860bb734953c23c241b8dad07cbd1b56e7784"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-f12dd136ba6a06abab0c82a5bbc7c11a8665ab8011b28b08b9df63b86239183edf2c4e278e13957ba94d51ba724860bb734953c23c241b8dad07cbd1b56e7784"' :
                                        'id="xs-injectables-links-module-UsersModule-f12dd136ba6a06abab0c82a5bbc7c11a8665ab8011b28b08b9df63b86239183edf2c4e278e13957ba94d51ba724860bb734953c23c241b8dad07cbd1b56e7784"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateNewPostDto.html" data-type="entity-link" >CreateNewPostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostMetaOptions.html" data-type="entity-link" >CreatePostMetaOptions</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUserParamDto.html" data-type="entity-link" >GetUserParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});