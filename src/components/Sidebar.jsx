import styled from "styled-components";
import logo from "../Fotos/logo.png";
import { useLocation } from "react-router-dom";
import { AiOutlineUser, AiOutlineHome, AiOutlineLeft } from "react-icons/ai"; // Importa AiOutlineLeft
import { MdOutlineAnalytics, MdLogout } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../App";

// Si 'v' se usa en tu archivo de Variables, asegúrate de importarlo
import { v } from "../styles/Variables"; // Asegúrate de tener 'v' exportado en ese archivo

export function Sidebar({ sidebarOpen, setSidebarOpen }) {
    const ModSidebaropen = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const { setTheme, theme } = useContext(ThemeContext);
    const CambiarTheme = () => {
        setTheme((theme) => (theme === "light" ? "dark" : "light"));
    };

    const location = useLocation();

    // No renderizar el sidebar si estás en la ruta del login
    if (location.pathname === "/login") {
        return null;
    }

    // Obtener el rol del usuario desde el token (decodificar el JWT)
    const token = localStorage.getItem("token");
    const userRole = token ? JSON.parse(atob(token.split(".")[1])).role : null; // Decodificar JWT para obtener el rol

    // Definir los enlaces según el rol
    const linksArray =
        userRole === "Administrador"
            ? [
                  {
                      label: "Inicio",
                      icon: <AiOutlineHome />,
                      to: "/admin-dashboard",
                  },
                  {
                      label: "Nuevo Trabajador",
                      icon: <AiOutlineUser />,
                      to: "/nuevo-trabajador",
                  },
                  {
                      label: "Agregar Producto",
                      icon: <AiOutlineUser />,
                      to: "/agregar-producto",
                  },
                  {
                      label: "Ver Joyería",
                      icon: <AiOutlineUser />,
                      to: "/ver-joyeria",
                  },
                  {
                      label: "Estadísticas",
                      icon: <MdOutlineAnalytics />,
                      to: "/estadistica",
                  },
              ]
            : userRole === "Trabajador"
            ? [
                  {
                      label: "Worker Dashboard",
                      icon: <AiOutlineHome />,
                      to: "/worker-dashboard",
                  },
                  {
                      label: "Nuevo Cliente",
                      icon: <AiOutlineUser />,
                      to: "/nuevo-cliente",
                  },
              ]
            : []; // En caso de que no haya un rol asignado o no sea ni admin ni trabajador

    const secondarylinksArray = [
        { label: "Cerrar sesión", icon: <MdLogout />, to: "/login" },
    ];

    return (
        <Container isOpen={sidebarOpen} themeUse={theme}>
            <button className="Sidebarbutton" onClick={ModSidebaropen}>
                <AiOutlineLeft />
            </button>
            <div className="Logocontent">
                <div className="imgcontent">
                    <img
                        src={logo}
                        alt="Logo"
                        style={{ width: "45px", height: "auto" }}
                    />
                </div>

                <h2>LiquidDev</h2>
            </div>

            {/* Enlaces principales */}
            {linksArray.map(({ icon, label, to }) => (
                <div className="LinkContainer" key={label}>
                    <NavLink
                        to={to}
                        className={({ isActive }) =>
                            `Links${isActive ? ` active` : ``}`
                        }
                        //#region Animación de cerrar
                        //onClick={() => setSidebarOpen(false)}
                        //#endregion
                    >
                        <div className="Linkicon">{icon}</div>
                        {sidebarOpen && <span>{label}</span>}
                    </NavLink>
                </div>
            ))}

            <Divider />

            {/* Enlaces secundarios */}
            {secondarylinksArray.map(({ icon, label, to }) => (
                <div className="LinkContainer" key={label}>
                    <NavLink
                        to={to}
                        className={({ isActive }) =>
                            `Links${isActive ? ` active` : ``}`
                        }
                        onClick={() => {
                            if (to === "/login") {
                                localStorage.removeItem("token"); // Eliminar token al cerrar sesión
                            }
                        }}
                    >
                        <div className="Linkicon">{icon}</div>
                        {sidebarOpen && <span>{label}</span>}
                    </NavLink>
                </div>
            ))}

            <Divider />

            {/* Modo oscuro */}
            <div className="Themecontent">
                {sidebarOpen && <span className="titletheme">Modo Oscuro</span>}
                <div className="Togglecontent">
                    <div className="grid theme-container">
                        <div className="content">
                            <div className="demo">
                                <label className="switch" istheme={theme}>
                                    <input
                                        istheme={theme}
                                        type="checkbox"
                                        className="theme-swither"
                                        onClick={CambiarTheme}
                                    />
                                    <span
                                        istheme={theme}
                                        className="slider round"
                                    ></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

//#region Data links
// const linksArray = [
//   {
//     label: "Worker Dashboard",
//     icon: <AiOutlineHome />,
//     to: "/worker-dashboard",
//   },
//   {
//     label: "Nuevo Cliente",
//     icon: <AiOutlineUser />,
//     to: "/nuevo-cliente",
//   },
//   // {
//   //   label: "Productos",
//   //   icon: <AiOutlineApartment />,
//   //   to: "/productos",
//   // },
//   // {
//   //   label: "Diagramas",
//   //   icon: <MdOutlineAnalytics />,
//   //   to: "/diagramas",
//   // },
//   // {
//   //   label: "Reportes",
//   //   icon: <MdOutlineAnalytics />,
//   //   to: "/reportes",
//   // },
// ];

// const secondarylinksArray = [
//   // {
//   //   label: "Configuración",
//   //   icon: <AiOutlineSetting />,
//   //   to: "/null",
//   // },
//   {
//     label: "Salir",
//     icon: <MdLogout />,
//     to: "/login",
//   },
// ];
//#endregion

//#region STYLED COMPONENTS
const Container = styled.div`
    color: ${(props) => props.theme.text};
    background: ${(props) => props.theme.bg};
    position: sticky;
    padding-top: 20px;
    .Sidebarbutton {
        position: absolute;
        top: ${v.xxlSpacing};
        right: -18px;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: ${(props) => props.theme.bgtgderecha};
        box-shadow: 0 0 4px ${(props) => props.theme.bg3},
            0 0 7px ${(props) => props.theme.bg};
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s;
        transform: ${({ isOpen }) => (isOpen ? `initial` : `rotate(180deg)`)};
        border: none;
        letter-spacing: inherit;
        color: inherit;
        font-size: inherit;
        text-align: inherit;
        padding: 0;
        font-family: inherit;
        outline: none;
    }
    .Logocontent {
        display: flex;
        justify-content: center;
        align-items: center;

        padding-bottom: ${v.lgSpacing};
        .imgcontent {
            display: flex;
            img {
                max-width: 100%;
                height: auto;
            }
            cursor: pointer;
            transition: all 0.3s;
            transform: ${({ isOpen }) =>
                isOpen ? `scale(0.7)` : `scale(1.5)`};
        }
        h2 {
            display: ${({ isOpen }) => (isOpen ? `block` : `none`)};
        }
    }
    .LinkContainer {
        margin: 8px 0;

        padding: 0 15%;
        :hover {
            background: ${(props) => props.theme.bg3};
        }
        .Links {
            display: flex;
            align-items: center;
            text-decoration: none;
            padding: calc(${v.smSpacing}-2px) 0;
            color: ${(props) => props.theme.text};
            height: 50px;
            .Linkicon {
                padding: ${v.smSpacing} ${v.mdSpacing};
                display: flex;

                svg {
                    font-size: 25px;
                }
            }
            &.active {
                .Linkicon {
                    svg {
                        color: ${(props) => props.theme.bg4};
                    }
                }
            }
        }
    }
    .Themecontent {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .titletheme {
            display: block;
            padding: 10px;
            font-weight: 700;
            opacity: ${({ isOpen }) => (isOpen ? `1` : `0`)};
            transition: all 0.3s;
            white-space: nowrap;
            overflow: hidden;
        }
        .Togglecontent {
            margin: ${({ isOpen }) => (isOpen ? `auto 40px` : `auto 15px`)};
            width: 36px;
            height: 20px;
            border-radius: 10px;
            transition: all 0.3s;
            position: relative;
            .theme-container {
                background-blend-mode: multiply, multiply;
                transition: 0.4s;
                .grid {
                    display: grid;
                    justify-items: center;
                    align-content: center;
                    height: 100vh;
                    width: 100vw;
                    font-family: "Lato", sans-serif;
                }
                .demo {
                    font-size: 32px;
                    .switch {
                        position: relative;
                        display: inline-block;
                        width: 60px;
                        height: 34px;
                        .theme-swither {
                            opacity: 0;
                            width: 0;
                            height: 0;
                            &:checked + .slider:before {
                                left: 4px;
                                content: "🌑";
                                transform: translateX(26px);
                            }
                        }
                        .slider {
                            position: absolute;
                            cursor: pointer;
                            top: 0;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            background: ${({ themeUse }) =>
                                themeUse === "light"
                                    ? v.lightcheckbox
                                    : v.checkbox};

                            transition: 0.4s;
                            &::before {
                                position: absolute;
                                content: "☀️";
                                height: 0px;
                                width: 0px;
                                left: -10px;
                                top: 16px;
                                line-height: 0px;
                                transition: 0.4s;
                            }
                            &.round {
                                border-radius: 34px;

                                &::before {
                                    border-radius: 50%;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;
const Divider = styled.div`
    height: 1px;
    width: 100%;
    background: ${(props) => props.theme.bg3};
    margin: ${v.lgSpacing} 0;
`;
//#endregion
