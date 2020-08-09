import React from 'react';

import Navbar from '../../Containers/Navbar';
import Sidebar from '../../Containers/User/Sidebar';

import '../../Styles/User/Main.scss';
import { Button, Avatar, Drawer } from '@material-ui/core';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import MenuIcon from '@material-ui/icons/Menu';

import { Link } from 'react-router-dom';

import { auth, db } from '../../Firebase';

// Redux
import { useDispatch } from 'react-redux';
import { AddFirstAndSecondNamesAction } from '../../Redux/Actions/mainActions';

export default function Main() {
  // Create state for menu
  const [state, setState] = React.useState({
    right: false,
  });

  // Redux
  const dispatch = useDispatch();

  // Take a user object
  auth.onAuthStateChanged((user) => {
    // Find in users collection document with user id name

    if (user) {
      db.collection('users')
        .doc(user?.uid)
        // Get found document
        .get()
        .then((snapshot) => {
          // Get names from document fields
          const firstName = snapshot.get('firstName');
          const secondName = snapshot.get('secondName');
          // Create new action with first and second names
          const firstAndSecondNames = AddFirstAndSecondNamesAction({
            firstName,
            secondName,
          });
          // Dispatch action to reducer
          dispatch(firstAndSecondNames);
        });
    }
  });

  // Handle for sign out
  const handleSignOut = () => {
    auth.signOut();
  };

  // Toggle funtion for menu
  const toggleDrawer = (anchor: any, open: any) => (event: any) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  // Get window width
  const width = +window.innerWidth;

  return (
    <>
      <Navbar>
        <Link to={`/`}>
          <Button variant='contained' color='primary' onClick={handleSignOut}>
            <ExitToAppRoundedIcon />
          </Button>
        </Link>
        <Button variant='text' color='primary'>
          <Avatar className='avatar'>U</Avatar>
        </Button>

        {
          // If window width less than 1080px then we render menu button
          width <= 1080 ? (
            <>
              <Button
                onClick={toggleDrawer('right', true)}
                variant='contained'
                color='primary'
              >
                <MenuIcon />
              </Button>
              <Drawer
                anchor='right'
                open={state['right']}
                onClose={toggleDrawer('right', false)}
              >
                <Sidebar></Sidebar>
              </Drawer>
            </>
          ) : (
            // Else nothing
            ''
          )
        }
      </Navbar>
      <div className='container'>
        <div className='main'>
          <div className='content'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae
            cupiditate, quis adipisci nemo laborum nostrum ad eligendi.
            Voluptatum deserunt unde, cupiditate inventore repellat nostrum
            reiciendis neque at dignissimos numquam autem ipsum placeat ullam
            nulla, consequatur tempore repudiandae molestiae blanditiis! Tempore
            necessitatibus molestiae placeat alias saepe aspernatur nobis
            veritatis sequi quaerat. Deleniti atque nisi aliquid, voluptatem
            perferendis sequi dolorum, nostrum officia totam ut facilis ratione
            alias pariatur necessitatibus asperiores at debitis veniam! Dicta
            numquam tempore earum. Vitae consectetur eligendi debitis ipsam non
            sequi similique cupiditate veritatis assumenda eius officia vero,
            quis, aliquam at voluptate veniam earum? Alias fuga dolor recusandae
            quas omnis totam ex, vitae, consequatur debitis sunt eligendi
            dolorem expedita impedit quasi eveniet temporibus? Voluptates nisi
            quia, et modi, ipsam animi consequuntur iusto distinctio tempora
            minus itaque id doloremque voluptatum, quae sapiente hic ad rem
            voluptatibus. Similique doloremque modi, porro expedita optio
            commodi saepe dolorum, ea impedit aut corporis voluptatibus dolores?
            Quo iste vero laborum unde, non dolores voluptatum laudantium animi
            molestias reiciendis quidem dolorem eligendi repellat accusamus,
            cumque quae enim dicta sit ab nisi in eius magni. Odit ducimus
            numquam maxime illum ut esse ratione dolores eos voluptas sequi
            voluptatibus, obcaecati assumenda earum sint repellat, adipisci in
            fugit. Illum repudiandae asperiores fugiat excepturi dolor, non
            dolore corrupti deleniti soluta enim necessitatibus, exercitationem
            ex! Corporis aut eaque quam, excepturi culpa eum consequatur officia
            sint magnam voluptatum quibusdam. Rerum, soluta. Modi veniam nam,
            quos quibusdam id asperiores officia recusandae iusto dignissimos
            harum architecto dolorum, voluptas necessitatibus culpa delectus
            aspernatur odio eius cupiditate! Assumenda accusantium, quasi
            molestiae tempore voluptatibus cum facilis architecto soluta veniam
            laudantium, maiores a perferendis iste deserunt rerum autem
            repellendus voluptatem? Temporibus perferendis, perspiciatis
            distinctio consectetur quaerat labore voluptatibus molestias
            repudiandae nam accusantium amet numquam, voluptate voluptatum
            obcaecati quod nihil. Laborum accusamus soluta sint quis molestiae
            dolore repellendus provident perferendis? Voluptatem rem impedit
            quae dignissimos sunt labore dolorum, laboriosam alias doloribus
            harum atque ratione modi nam praesentium maiores enim magni saepe?
            Tempora incidunt hic repellat distinctio quibusdam reprehenderit
            itaque eum soluta. Omnis unde cupiditate fugit quasi iste! Veritatis
            consequatur amet, pariatur omnis, quibusdam hic voluptatibus ea
            mollitia adipisci cupiditate, maiores commodi corporis eius.
            Doloremque voluptate voluptatibus vel. Maiores excepturi veritatis
            aut ut, deleniti eveniet quibusdam architecto ducimus assumenda,
            sunt ex illum impedit quos laudantium alias necessitatibus tempora
            hic rem. Error recusandae distinctio cum voluptatibus pariatur
            corrupti voluptatum ducimus voluptas molestias exercitationem quidem
            quod delectus, placeat doloribus neque quas illo facere voluptatem
            magni! Aperiam beatae quasi, sequi tempore corporis modi debitis,
            explicabo excepturi ab vitae mollitia nostrum architecto sed? Sit
            laudantium eum ullam, autem accusantium asperiores dicta officia.
            Earum ullam obcaecati temporibus tenetur magnam maiores dicta. Neque
            est, voluptates adipisci debitis saepe sed rerum modi veniam sunt
            non, natus nisi impedit autem cumque iusto, dolorem fuga praesentium
            ab explicabo eum unde illo. Consectetur voluptas molestias
            praesentium cupiditate, porro sit quidem laborum veniam molestiae
            dolores suscipit fugiat error sapiente repellat. Praesentium iusto
            aut ut illum similique possimus ipsum, iure quae debitis expedita
            architecto. Omnis doloribus asperiores praesentium architecto
            consectetur, iure corporis eos inventore, perferendis quos esse
            quibusdam earum odio ab ipsam nam saepe similique itaque sequi?
            Placeat modi mollitia iste itaque nobis voluptate fugiat cupiditate.
            Quisquam odit aut maxime animi reiciendis iusto eveniet nesciunt
            minus aliquid deleniti fugit consequuntur quasi assumenda unde quos,
            tempora aliquam illo. Cumque facere fugit possimus quos rem ab
            aliquam inventore dicta animi repellat atque necessitatibus
            laboriosam corrupti at, libero odit consequatur magni dolores
            veritatis rerum harum voluptate porro? Sequi esse in est ipsam
            ducimus qui sed! Inventore, est nesciunt impedit beatae itaque qui
            dicta quasi distinctio asperiores magnam veritatis ad architecto,
            adipisci nulla at odio magni? Quia similique distinctio, accusantium
            ut modi autem sint temporibus. Dicta, soluta laborum doloremque
            minima consequuntur aliquam perferendis incidunt illum, autem ipsam
            esse perspiciatis, quam voluptatibus facilis dolore rem hic aliquid
            id totam. Cum deleniti voluptates nesciunt repellendus consectetur
            quasi, fugiat distinctio neque repudiandae ducimus explicabo
            adipisci mollitia libero dignissimos. Animi consectetur
            reprehenderit nemo? Autem esse expedita minus libero repellat
            excepturi perferendis optio nisi corrupti ipsa. Impedit delectus
            corporis at, aut illo ad fugiat, optio pariatur et expedita eos ipsa
            nesciunt. Voluptate delectus aliquid, asperiores sint, temporibus
            nesciunt maiores quis esse porro culpa animi vel, ullam atque
            praesentium quam eligendi repellat adipisci dolor in a accusamus
            consequuntur! Iure non aut dolores culpa ipsum sapiente ab quidem
            amet nulla, placeat nemo modi numquam? Ipsum quae saepe, fugit sit
            omnis quibusdam. Ipsum laboriosam dolorum delectus cupiditate illo
            ad vel tempora exercitationem sit ratione eveniet odio excepturi
            fugiat, aperiam, doloremque consequuntur quo odit qui id temporibus
            optio dolores dolorem. Modi, ab, ipsum quia distinctio aspernatur
            nemo ullam at, neque voluptatem reprehenderit minima ex. Optio
            placeat iure odit doloremque eius consequatur assumenda repudiandae
            ducimus omnis laborum similique, sunt, consequuntur eum recusandae!
            Consequatur, ab quisquam sequi deserunt assumenda enim, vel aliquid
            eos in animi officia fugit modi. Repellendus laudantium iste soluta
            odio accusantium, non reiciendis itaque tempora quis ipsam pariatur
            velit cupiditate vitae voluptates deleniti consequuntur ipsum cum
            nam quo aliquid? Aut, mollitia. Dignissimos aliquam consequuntur
            officiis dolor ipsa tempora ducimus! Doloribus, odio? Vel illo,
            consectetur necessitatibus soluta facere maxime dolore? Quisquam
            magni nobis quam molestias temporibus consequatur provident unde?
            Odit officia officiis sed, alias illo doloremque nesciunt ipsam sint
            veniam corrupti nam obcaecati beatae architecto impedit quod quasi
            consectetur dolorem error magnam qui inventore incidunt ipsum. Cum,
            vitae laboriosam harum delectus exercitationem iste perspiciatis
            quos tenetur ipsam quis repudiandae vel hic temporibus ea accusamus
            expedita ullam deleniti, odio alias esse minima? Temporibus
            molestiae ullam reiciendis modi inventore accusamus, reprehenderit
            ipsam culpa odit recusandae in quisquam ab libero hic, asperiores
            blanditiis fugit doloremque exercitationem dolorem a magnam dolorum
            quasi possimus impedit. Cupiditate ipsum alias illum nihil veniam
            adipisci? Deleniti, libero nesciunt ratione minus officia sapiente
            accusamus voluptas, neque provident laborum asperiores! Iusto, ipsum
            aliquam voluptatem delectus nulla quia cupiditate corporis maiores
            repellendus molestiae itaque mollitia, assumenda, blanditiis
            perspiciatis ratione vel minus et dignissimos voluptate id repellat
            dolore modi sit. Doloremque fugit officiis quis, numquam commodi
            ducimus voluptatem modi fugiat aut repellendus eum, animi id
            assumenda earum ex! Ut quo animi deserunt blanditiis accusantium
            soluta unde debitis laborum tenetur. Incidunt minima magnam ab
            expedita modi pariatur provident voluptate voluptas ducimus.
            Voluptatibus quo accusantium facilis hic pariatur perferendis
            repellendus officia assumenda ullam ex! Nobis quibusdam perferendis
            voluptates. Repellendus eligendi mollitia repellat nesciunt,
            voluptas cupiditate inventore enim voluptatum sequi aperiam quo
            ullam, beatae dignissimos assumenda adipisci? Iure omnis incidunt
            ullam a aut magni placeat, quasi, impedit maxime odio fugit eum
            eaque officia accusamus! Dicta quo voluptatem distinctio minima!
            Nemo nam deleniti accusamus sint quaerat, tempore error, vel ipsam
            minima quae suscipit, optio rem officia. Nemo ipsam ipsa adipisci
            numquam ad autem, accusantium cum dolor atque aut distinctio
            deserunt consequuntur cupiditate sit! Labore laudantium hic ut quis
            aliquid, praesentium molestias repellat itaque a explicabo voluptas
            eius rerum dolor nostrum enim unde distinctio? Praesentium, at?
            Corrupti veniam ullam consectetur laudantium quibusdam dolor quia
            amet, explicabo totam! Sequi debitis esse aliquid nam accusamus quod
            distinctio necessitatibus corrupti modi. Quaerat sed placeat
            veritatis expedita rem consequatur vitae illum at velit a, eius
            nulla iusto culpa ducimus? Et, a incidunt. Nobis fuga quae eius
            laborum quo! Similique deserunt possimus placeat minus quis quasi.
            Eos debitis temporibus saepe incidunt voluptate tempora, assumenda
            dolorem repellendus repudiandae!
          </div>
          {width <= 1080 ? '' : <Sidebar></Sidebar>}
        </div>
      </div>
    </>
  );
}
