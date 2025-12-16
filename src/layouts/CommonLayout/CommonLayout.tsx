import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';

interface PropType {
  component: React.FC;
}

const CommonLayout: React.FC<PropType> = ({ component: Component }) => {
  return (
    <main className="w-screen h-dvh overflow-x-hidden overflow-y-auto bg-(--light) flex">
      <SideBar />
      <section className="flex-1 flex flex-col items-start overflow-auto relative">
        <Header />
        <section className="flex-1 flex w-full p-1">
          <Component />
        </section>
      </section>
    </main>
  );
};

export default CommonLayout;
